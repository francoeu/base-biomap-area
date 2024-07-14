"use client"
import { useEffect } from 'react';

function parseParams(paramsString, params) {
  // O código da função parseParams permanece o mesmo
  paramsString = paramsString.substring(1);
  var firstSeparatorPos = paramsString.indexOf(",");
  if (firstSeparatorPos != -1) {
      params.startNode = paramsString.slice(0, firstSeparatorPos);
      var viewingParamsString = paramsString.slice(firstSeparatorPos + 1);
      var viewingParams = viewingParamsString.split(",");
      if (viewingParams.length >= 3) {
          var startView = {};
          startView["pan"] = viewingParams[0];
          startView["tilt"] = viewingParams[1];
          startView["fov"] = viewingParams[2];
          if (viewingParams.length >= 4) {
              startView["projection"] = viewingParams[3];
          }
          params.startView = startView;
      }
  } else {
      params.startNode = paramsString;
      params.startView = "";
  }
}

export default function TourViewer() {
  useEffect(() => {
    // Aqui, colocamos o código que estava dentro do <script> original
    var params = {};
		parseParams(document.location.hash, params);
		var startNode = params.startNode;
		var startView = params.startView;
		if (("onhashchange" in window) && (!(/MSIE (\d+\.\d+);/.test(navigator.userAgent)))) {
			window.onhashchange = function () {
				parseParams(window.location.hash, params);
				pano.openNext('{' + params.startNode + '}', params.startView);
			}
		} else {
			var lastHash = window.location.hash;
			window.setInterval(function () {
				if (window.location.hash != lastHash) {
					lastHash = window.location.hash;
					parseParams(window.location.hash, params);
					pano.openNext('{' + params.startNode + '}', params.startView);
				}
			}, 100);
		}
    // para a inicialização do tour virtual
    function initTour() {
      // create the panorama player with the container
      const pano = new pano2vrPlayer('container');
      const params = {};
      parseParams(document.location.hash, params);
      const startNode = params.startNode;
      const startView = params.startView;
      pano.startNode = startNode;
      pano.startView = startView;
      pano.setQueryParameter('ts=88132087'); // ID do Tour para alterar aqui...

      // load the configuration
      window.addEventListener('load', function () {
        // Para exibição de diferentes arquivos de tour, além da pasta "tiles" que inclusive pode ser renomeada
        // contendo os arquivos de imagens de cada tour, será necessário o código de ID referenciado após o ts=
        // como abaixo. Ele também se repete em outras partes do codigo e muda para cada tour.
        pano.readConfigUrlAsync('pano2vr/pano.xml?ts=88132087'); // ID do Tour para alterar aqui tbm...
      });

      if (window.navigator.userAgent.match(/Safari/i)) {
        // fix for white borders, rotation on iPhone
        function iosHfix(e) {
          // Código para iosHfix permanece o mesmo
          var container=document.getElementById("container");
          var oh=container.offsetHeight;
          document.documentElement.style.setProperty('height', '100vh');
          if (oh!=container.offsetHeight) {
              container.style.setProperty('height',"100%");
          } else {
              container.style.setProperty('height',window.innerHeight+"px");
          }
          window.scrollTo(0, 0);
          pano.setViewerSize(container.offsetWidth, container.offsetHeight);
        }
        setTimeout(iosHfix, 0);
        setTimeout(iosHfix, 100);
        window.addEventListener('resize', function () {
          // Código para resize permanece o mesmo
          setTimeout(iosHfix,0);
          // hide toolbar on iPad happens with a delay
          setTimeout(iosHfix,500);
          setTimeout(iosHfix,1000);
          setTimeout(iosHfix,2000);
        });
      }
    }

    // Carregando o script do Pano2VR Player dinamicamente
    const script = document.createElement('script');
    script.src = 'pano2vr/pano2vr_player.js?ts=88132087'; // e ... ID do Tour para alterar aqui tbm...
    // script.src = 'pano2vr/pano2vr_player.js?ts=88132087';
    script.onload = () => initTour();
    document.body.appendChild(script);

    // Removendo o script do Pano2VR Player ao desmontar o componente
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="container" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <br />
      Loading...
      <br />
      <br />
    </div>
  );
}
