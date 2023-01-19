import { useState, useEffect } from "react";

function useFriendStatus(friendID) {
  const [isOnline, setOnlie] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setOnlie(status.isOnline);
    }

	 handleStatusChange(friendID);
  });

  return isOnline;
}

export { useFriendStatus };
