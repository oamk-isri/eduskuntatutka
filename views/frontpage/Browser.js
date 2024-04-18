import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview";

export default Browser = (props) => {
  const webviewRef = useRef(null);
  const [hasInitialLoadFinished, setHasInitialLoadFinished] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const timeoutIdRef = useRef(null);

  const handleLoad = async () => {
    clearTimeout(timeoutIdRef.current);

    if (!hasLoaded) {
      try {
        setHasLoaded(true);
        setIsLoading(true);
      } catch (error) {
        console.error("Error injecting script:", error);
      }
    }
  };

  const handleLoadEnd = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
      setIsLoading(true);
    }
  };

  const handleLoadStart = () => {
    if (!isLoading) {
      setIsLoading(true);
    }
  };

  function removeContentFromDiv(divId) {
    const script = `
      var targetDiv = document.getElementById('${divId}');
      if (targetDiv) {
        targetDiv.innerHTML = ''; // Set innerHTML to empty string to remove content
      }
    `;
    return script;
  }

  function removeUnwantedElementsAndDisableLinks() {
    const script = `
      var mainContent = document.getElementById('maincontent');
  
      if (mainContent) {
        // Create a new document fragment to temporarily hold elements
        var fragment = document.createDocumentFragment();
  
        // Remove element with class "noindex" (assuming mobile navigation)
        var elementsToRemove = document.querySelectorAll('.noindex');
        for (var i = 0; i < elementsToRemove.length; i++) {
          elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
        }
  
        // Append mainContent to the fragment
        fragment.appendChild(mainContent);
  
        // Remove other unwanted elements from the body
        var elementsToRemove = document.body.querySelectorAll('*:not(#maincontent)');
        for (var i = 0; i < elementsToRemove.length; i++) {
          // Exclude the mobile navigation, as it's already removed
          if (elementsToRemove[i].id !== 'leftnavigationMobile') {
            elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
          }
        }
  
        // Append the mainContent element back to the body
        document.body.appendChild(fragment);
  
        // Ensure the remaining content has sufficient height for scrolling
        var contentHeight = mainContent.offsetHeight;
        if (contentHeight < document.documentElement.clientHeight) {
          // If mainContent is shorter than the viewport, adjust body's min-height
          document.body.style.minHeight = document.documentElement.clientHeight + 'px';
        }
  
        // Address potential overflow hidden styles (optional)
        document.body.style.overflowY = 'auto'; // Enable vertical scrolling if needed
  
        // Disable links and set color to black with no text decoration
        var anchors = document.querySelectorAll('a');
        for (var i = 0; i < anchors.length; i++) {
          anchors[i].addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
          });
          anchors[i].style.color = 'black';
          anchors[i].style.textDecoration = 'none'; // Remove text decoration
        }
      }
    `;
    return script;
  }

  function resolutionsScript() {
    const script = `
    var targetDiv = document.querySelector('.resolution-register');

    setInterval(function() {
      var buttonsToRemove = document.querySelectorAll('button');
      buttonsToRemove.forEach(function(button) {
        if (button.innerText.trim() === 'Palaa') {
          button.parentNode.removeChild(button);
        }
      });
    }, 1000);

    if (targetDiv) {
      // Remove everything else from the body
      var body = document.body;
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      // Append the targetDiv back to the body
      body.appendChild(targetDiv);
    }
    `;
    return script;
  }

  function kansalaisinfoScript() {
    const script = `
      (function() {
        var mainContent = document.querySelector('div[role="main"]');
        if (mainContent) {
          // Remove everything else from the body
          var body = document.body;
          while (body.firstChild) {
            body.removeChild(body.firstChild);
          }
          // Append the main content back to the body
          body.appendChild(mainContent);
          
          // Ensure the remaining content has sufficient height for scrolling
          var contentHeight = mainContent.offsetHeight;
          if (contentHeight < document.documentElement.clientHeight) {
            document.body.style.minHeight = document.documentElement.clientHeight + 'px';
          }
          
          // Disable links within the main content
          var anchors = mainContent.querySelectorAll('a');
          for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function(event) {
              event.preventDefault(); // Prevent default link behavior
            });
            anchors[i].style.color = 'black';
            anchors[i].style.textDecoration = 'none'; // Remove text decoration
          }
          
          // Add 15px padding to the main content
          mainContent.style.padding = '15px';
        } else {
          console.warn("No main content div found");
        }
      })();
    `;
    return script;
  }
  const kansalaisinfo = `
  ${kansalaisinfoScript()}
`;

  const resolutions = `
  ${resolutionsScript()}
`;

  const otherScript = `
  ${removeUnwantedElementsAndDisableLinks()}
  ${removeContentFromDiv("edk-news-footer")}
`;

  const onShouldStartLoadWithRequest = (request) => {
    return true;
  };

  const handleNavigationStateChange = (navState) => {
    if (navState.url && !hasInitialLoadFinished) {
      setHasInitialLoadFinished(true);
    }
  };

  const handleLoadProgress = (event) => {
    const { progress } = event.nativeEvent;
    if (progress === 1) {
      setProgressCount((prevCount) => prevCount + 1);
      if (progressCount >= 3) {
        setHasLoaded(true);
        setIsLoading(false);
      }
    }
  };

  const renderWebview = () => {
    if (props.route.params.uri) {
      let scriptToInject;
      if (props.route.params.uri.includes("resolution")) {
        scriptToInject = resolutions;
      } else if (props.route.params.uri.includes("kansalaisinfo")) {
        scriptToInject = kansalaisinfo;
      } else {
        scriptToInject = otherScript;
      }

      return (
        <>
          <SafeAreaView style={styles.flexContainer}>
            <WebView
              javaScriptEnabled={true}
              onNavigationStateChange={handleNavigationStateChange}
              onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
              ref={webviewRef}
              incognito={true}
              injectedJavaScript={scriptToInject}
              source={{ uri: props.route.params.uri }}
              onLoadProgress={handleLoadProgress}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onLoad={handleLoad}
              opacity={hasLoaded && progressCount >= 3 ? 1 : 0}
            />
            {!hasLoaded ||
              (progressCount <= 3 && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color="#114d9d"
                    animating={true}
                  />
                </View>
              ))}
          </SafeAreaView>
        </>
      );
    }
    return null;
  };

  return <>{renderWebview()}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: "#d3d3d3",
    height: 56,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  button: {
    fontSize: 24,
  },
  arrow: {
    color: "#ef4771",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
