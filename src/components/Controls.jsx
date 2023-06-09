import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/base";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import LogoutIcon from '@mui/icons-material/Logout';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";




export default function Controls(props) {
  const { tracks, client, setStart, setInCall,  screenTrack, setScreenTrack} = useContext(SocketContext);
  const [trackState, setTrackState] = useState({ video: true, audio: true });
 
  const [screenSharing, setScreenSharing] = useState(false);
  const [screenSharingOff, setScreenSharingOff] = useState(false);
  
  const startScreenSharing = async () => {
    try {
      const screenSharingTrack = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: '1080p_1',
      });
      setScreenTrack(screenSharingTrack);
      setScreenSharing(true);
      setScreenSharingOff(false);
    } catch (error) {
      console.error('Failed to create screen sharing track:', error);
    }
  };

  const stopScreenSharing = async () => {
    if (screenTrack) {
      await client.unpublish(screenTrack);
      await client.publish(tracks[1]);
      await screenTrack.stop();
      setScreenTrack(null);
      setScreenSharing(false);
      setScreenSharingOff(true);
    }
  };

  useEffect(() =>{
    if(screenSharing){
      
      if (screenTrack && tracks){
        const fun = async () =>{
          await client.unpublish(tracks[1]);
          await client.publish(screenTrack);
        }
        fun();
      }
    }
    
  }, [screenTrack, client, screenSharing, screenSharingOff]);

 


  

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const navigate = useNavigate()

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    navigate('/');
  };
  


  return (
    <Grid container spacing={2} alignItems="center">
      
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => mute("audio")}
        >
          {trackState.audio ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => mute("video")}
        >
          {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
      </Grid>
     
      {screenTrack ? (
        <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={stopScreenSharing}
        >
           <StopScreenShareIcon />
        </Button>
      </Grid>
      ) : (
        <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={startScreenSharing}
        >
          <PresentToAllIcon /> 
        </Button>
      </Grid>
      )}
      <Grid item>
        <Button
          variant="contained"
          color="default"
          onClick={() => leaveChannel()}
        >
          Leave
          <LogoutIcon />
        </Button>
      </Grid>
      {/* {screenTrack && (
        <div>
          <h2>Screen Sharing Preview</h2>
          <video ref={(ref) => (ref ? screenTrack.play(ref) : null)} />
        </div>
      
      )} */}

    </Grid>
  );
}
