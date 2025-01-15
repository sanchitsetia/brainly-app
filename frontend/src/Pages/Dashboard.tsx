import React, { useState } from "react";
import AddContentModal from "../components/AddContentModal";
import SideBar from "../components/ui/SideBar";
import Button from "../components/ui/Button";
import PlusIcon from "../Icons/PlusIcon";
import ShareIcon from "../Icons/ShareIcon";
import Card from "../components/ui/Card";
import YoutubeIcon from "../Icons/YoutubeIcon";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <AddContentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
      <div className="flex">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="p-10 w-4/5 bg-gray-200">
          <div className="flex justify-end gap-2">
            <Button
              variant="Primary"
              size="md"
              title="Add Content"
              startIcon={<PlusIcon />}
              onClick={() => {
                setModalOpen(true);
              }}
            />
            <Button
              variant="Secondary"
              size="md"
              title="Share Brain"
              startIcon={<ShareIcon />}
            />
          </div>
          <div className="flex gap-2">
            <Card
              title="Project ideas da sasdas adas dasd adas"
              cardIconVariant={<YoutubeIcon />}
              type="youtube"
              link="https://www.youtube.com/watch?v=W_OSkrWQEms"
            />
            <Card
              title="Project ideas da sasdas adas dasd adas"
              cardIconVariant={<YoutubeIcon />}
              type="twitter"
              link="https://x.com/andrewjclare/status/1878910628565594244"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
