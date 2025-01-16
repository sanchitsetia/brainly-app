import React, { useState } from "react";
import AddContentModal from "../components/AddContentModal";
import SideBar from "../components/ui/SideBar";
import Button from "../components/ui/Button";
import PlusIcon from "../Icons/PlusIcon";
import ShareIcon from "../Icons/ShareIcon";
import Card from "../components/ui/Card";
import YoutubeIcon from "../Icons/YoutubeIcon";
import { useQuery } from "react-query";
import axios from "axios";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const getContentQuery = useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      return await axios.get("http://localhost:3000/api/v1/content", {
        withCredentials: true,
      });
    },
  });
  console.log("contrent query", getContentQuery.data);
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
          <div className="flex gap-2 flex-wrap">
            {getContentQuery.data?.data?.contents.map((item: any) => (
              <Card
                title={item.title}
                cardIconVariant={<YoutubeIcon />}
                type={item.type}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
