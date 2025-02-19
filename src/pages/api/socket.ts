// pages/api/socket.ts
import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { InterviewAgent } from "../../lib/agent/interviewer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!(res.socket as any).server.io) {
    const httpServer: NetServer = (res.socket as any).server;
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("start_interview", async (context) => {
        try {
          const agent = InterviewAgent.getInstance(context);
          const result = await agent.processResponse("");
          socket.emit("question", result.question);
        } catch (error) {
          console.error("Error starting interview:", error);
          socket.emit("error", "Failed to start interview");
        }
      });

      socket.on("submit_response", async (data) => {
        try {
          const { response, context } = data;
          const agent = InterviewAgent.getInstance(context);
          const result = await agent.processResponse(response);

          if (result.feedback) {
            socket.emit("feedback", result.feedback);
          }
          socket.emit("question", result.question);
        } catch (error) {
          console.error("Error processing response:", error);
          socket.emit("error", "Failed to process response");
        }
      });
    });

    (res.socket as any).server.io = io;
  }
  res.end();
};

export default ioHandler;
