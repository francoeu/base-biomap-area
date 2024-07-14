// Importe os módulos necessários

// Componente que representa o player do Pano2VR
const Pano2VRPlayer = () => {
    // Caminho para a pasta pano2vr na pasta pública
    const pano2vrPath = "/pano2vr/";
  
    // Caminho para o arquivo pano.xml
    const panoXMLPath = `${pano2vrPath}pano.xml`;
  
    // Estilo para o iframe que contém o player do Pano2VR
    const iframeStyle = {
      width: "100%",
      height: "100vh", // Ou o tamanho desejado para exibir o tour virtual
      border: "none",
    };
  
    return <iframe src={panoXMLPath} style={iframeStyle} title="Pano2VR Player"></iframe>;
  };
  
  export default Pano2VRPlayer;
  