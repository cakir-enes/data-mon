import React, { useEffect } from "react";
import { Classes, Dialog, Button } from "@blueprintjs/core";
import { useState } from "react";

export const useIsPublishing = () => {
  let [isPublishing, setIsPublishing] = useState(false);
  useEffect(() => console.log("effects " + isPublishing), [isPublishing]);
  return [isPublishing, setIsPublishing];
};

export const TopicPublisher = ({ isPublishing }: { isPublishing: boolean }) => {
  return (
    <Dialog title="Publish a Topic:" isOpen={isPublishing}>
      <div className={Classes.DIALOG_BODY}>zilelelleley</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button text="PUBLISHthss" />
        </div>
      </div>
    </Dialog>
  );
};
