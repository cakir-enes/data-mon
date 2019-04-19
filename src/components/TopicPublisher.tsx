import React, { useEffect } from "react";
import { Overlay, Classes, Dialog, Button } from "@blueprintjs/core";
import { useState } from "react";

export const useIsPublishing = () => {
  let [isPublishing, setIsPublishing] = useState(false);
  useEffect(() => console.log("effects " + isPublishing), [isPublishing]);
  return [isPublishing, setIsPublishing];
};

export const TopicPublisher = () => {
  let [isPublishing, setIsPublishing] = useIsPublishing();
  useEffect(() => {
    console.log("RENDERING");
  }, [isPublishing]);
  return (
    <div>
      {/* <Button text="sdf" onClick={() => setIsPublishing(!isPublishing)} /> */}
      <Dialog>
        <p>sdfsdfsdfsdfds</p>
      </Dialog>
      {/* <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={true} onClose={() => setIsPublishing(false)}>
            LELELY {focusedTopic.name}
        </Overlay> */}
    </div>
  );
};
