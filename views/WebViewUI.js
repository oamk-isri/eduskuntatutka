import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";

function WebViewUI(props) {
  const webviewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialLoadFinished, setHasInitialLoadFinished] = useState(false);

  console.log(isLoading);

  const handleShouldStartLoad = (navState) => {
    setIsLoading(true);
    return true;
  };

  const handleNavigationStateChange = (navState) => {
    if (navState.url && !hasInitialLoadFinished) {
      console.log("NavState " + navState.url);
      setIsLoading(false);
      setHasInitialLoadFinished(true);
    }
  };

  function removeContentFromDiv(divId) {
    // Function to remove content from a div with a specific ID
    const script = `
      var targetDiv = document.getElementById('${divId}');
      if (targetDiv) {
        targetDiv.innerHTML = ''; // Set innerHTML to empty string to remove content
      }
    `;
    return script;
  }

  function removeNavigationElements() {
    // Function to remove elements with role="navigation"
    const script = `
      var navigation = document.querySelector('nav'); // Replace with the actual selector if needed
      if (navigation) {
        var elementsToRemove = navigation.querySelectorAll('[role="navigation"]');
        for (var i = 0; i < elementsToRemove.length; i++) {
          elementsToRemove[i].parentNode.removeChild(elementsToRemove[i]);
        }
      }
    `;
    return script;
  }

  function disableLinks() {
    // Function to remove elements with role="navigation"
    const script = `
    var anchors = document.querySelectorAll('a');
        for (var i = 0; i < anchors.length; i++) {
           anchors[i].addEventListener('click', function(event) {
             event.preventDefault(); // Prevent default link behavior
           });
           anchors[i].style.color = 'black'; // Set link color to black
         }

           var header = document.getElementById('header-id');
           if (header) {
             header.style.display = 'none';
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
  // function removeElementsExceptMainArea() {
  //   const script = `
  //     var mainArea = document.getElementById('maincontent');
  //     if (mainArea) {
  //       var fragment = document.createDocumentFragment();
  //       fragment.appendChild(mainArea);

  //       document.body.innerHTML = '';
  //       document.body.appendChild(fragment);

  //       // Check content height and adjust WebView's height if necessary
  //       if (mainArea.offsetHeight > document.documentElement.clientHeight) {
  //         // webViewRef.current.style.height = '100%'; // Adjust height as needed
  //       }
  //     }
  //   `;
  //   return script;
  // }

  function removeLeftNavigationMobile() {
    const script = `
      var leftnavigationMobile = document.getElementById('leftnavigationMobile');
      if (leftnavigationMobile) {
        leftnavigationMobile.parentNode.removeChild(leftnavigationMobile);
      }
    `;
    return script;
  }

  const handleMessage = () => {
    const divToRemoveId3 = "edk-news-footer";
    const scriptToInject2 = removeContentFromDiv(divToRemoveId3);
    // const scriptToInject3 = removeLeftNavigationMobile();
    const scriptToInject =
      removeUnwantedElementsAndDisableLinks(divToRemoveId3);
    webviewRef.current.injectJavaScript(scriptToInject);
    webviewRef.current.injectJavaScript(scriptToInject2);
    // webviewRef.current.injectJavaScript(scriptToInject3);
  };

  // const handleMessage = () => {
  //   const scriptToInject = removeElementsExceptMainArea();
  //   webviewRef.current.injectJavaScript(scriptToInject);
  // };

  // const handleMessage = () => {
  //   const divToRemoveId = "edk-header";
  //   const divToRemoveId2 = "edk-footer";
  //   const divToRemoveId3 = "edk-news-footer";
  //   const divToRemoveId4 = "breadcrumb";
  //   const scriptToInject1 = removeContentFromDiv(divToRemoveId);
  //   const scriptToInject2 = removeNavigationElements();
  //   const scriptToInject3 = disableLinks();
  //   const scriptToInject4 = removeContentFromDiv(divToRemoveId2);
  //   const scriptToInject5 = removeContentFromDiv(divToRemoveId3);
  //   const scriptToInject6 = removeContentFromDiv(divToRemoveId4);
  //   webviewRef.current.injectJavaScript(scriptToInject1);
  //   webviewRef.current.injectJavaScript(scriptToInject2);
  //   webviewRef.current.injectJavaScript(scriptToInject3);
  //   webviewRef.current.injectJavaScript(scriptToInject4);
  //   webviewRef.current.injectJavaScript(scriptToInject5);
  //   webviewRef.current.injectJavaScript(scriptToInject6);
  // };

  console.log("route " + props.route.params.uri);
  const renderWebview = () => {
    if (props.route.params.uri) {
      return (
        <>
          <WebView
            source={{ uri: props.route.params.uri }}
            // renderLoading={LoadingIndicatorView}
            javaScriptEnabled={true}
            // onShouldStartLoad={handleShouldStartLoad}
            onNavigationStateChange={handleNavigationStateChange}
            // startInLoadingState={true}
            onLoad={handleMessage}
            onShouldStartLoadWithRequest={(request) => {
              if (request.url.startsWith(props.route.params.uri)) {
                // Allow internal navigation
                return true;
              } else {
                // Handle external link opening (e.g., using Linking or a custom function)
                return false; // Prevent default WebView navigation
              }
            }}
            // setSupportMultipleWindows={false}
            // originWhitelist={["*"]}
            ref={webviewRef}
            // onShouldStartLoadWithRequest={(request) => {
            // Only allow navigating within this website
            // console.log(request);
            // return request.url.startsWith("https://www.eduskunta.fi");
            // }}
          />
        </>
      );
    }
    return null;
  };

  // function LoadingIndicatorView() {
  //   return (
  //     <ActivityIndicator
  //       color="#009b88"
  //       size="large"
  //       style={styles.ActivityIndicatorStyle}
  //     />
  //   );
  // }

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        {renderWebview()}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
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

export default WebViewUI;
