import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

function WebViewUI(props) {
  const webviewRef = useRef(null);
  const [hasInitialLoadFinished, setHasInitialLoadFinished] = useState(false);
  const [progressCount, setProgressCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const timeoutIdRef = useRef(null);

  const handleLoad = async () => {
    clearTimeout(timeoutIdRef.current);

    if (!hasLoaded) {
      try {
        webviewRef.current.injectJavaScript(combinedScript);
        setHasLoaded(true);
      } catch (error) {
        console.error("Error injecting script:", error);
      }
    }
  };

  const handleLoadEnd = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
      webviewRef.current.injectJavaScript(combinedScript);
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

  function removeEverythingExceptTargetDiv() {
    const script = `
    var targetDiv = document.querySelector('.resolution-register');
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

  const combinedScript = `
  ${removeUnwantedElementsAndDisableLinks("maincontent")}
  ${removeContentFromDiv("edk-news-footer")}
  ${removeEverythingExceptTargetDiv()}
`;

  const onShouldStartLoadWithRequest = (request) => {
    return true;
  };

  const handleNavigationStateChange = (navState) => {
    if (navState.url && !hasInitialLoadFinished) {
      setHasInitialLoadFinished(true);
      webviewRef.current.injectJavaScript(combinedScript);
    }
  };

  const handleLoadProgress = (event) => {
    const { progress } = event.nativeEvent;
    if (progress === 1) {
      setProgressCount((prevCount) => prevCount + 1);
      if (progressCount >= 3) {
        webviewRef.current.injectJavaScript(combinedScript);
        setHasLoaded(true);
      }
    }
  };

  const renderWebview = () => {
    if (props.route.params.uri) {
      return (
        <>
          <WebView
            javaScriptEnabled={true}
            onNavigationStateChange={handleNavigationStateChange}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            ref={webviewRef}
            incognito={true}
            injectedJavaScript={combinedScript}
            source={{ uri: props.route.params.uri }}
            onLoadProgress={handleLoadProgress}
            onLoadEnd={handleLoadEnd}
            onLoad={handleLoad}
            startInLoadingState={true}
            opacity={hasLoaded && progressCount >= 3 ? 1 : 0}
          />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        {renderWebview()}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default WebViewUI;
