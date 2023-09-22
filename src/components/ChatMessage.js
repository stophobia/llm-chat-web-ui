import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Snackbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Alert from "@mui/material/Alert";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatMessage({ chatMessage, alert }) {
  const [showCopied, setShowCopied] = React.useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(chatMessage.content);
    setShowCopied(true);
  };

  return (
    <Card
      sx={{
        width: "100vw",
        margin: "0px 0px",
        boxShadow: "0px 1px 1px -1px rgba(0,0,0,0.2)",
        backgroundColor: chatMessage.role === "user" ? "#1e1e1e" : "#101010",
      }}
      raised={false}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showCopied}
        autoHideDuration={2000}
        onClose={() => setShowCopied(false)}
        message="Copied!"
      />
      <CardContent>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography sx={{ fontSize: "0.8rem", color: "#eee" }} gutterBottom>
            {chatMessage.role}
          </Typography>
          <Box>
            {/* <IconButton size="small" color="primary">
              <VolumeUpIcon sx={{ fontSize: "1.3rem" }} />
            </IconButton> */}
            <IconButton size="small" color="primary" onClick={() => onCopy()}>
              <ContentPasteIcon sx={{ fontSize: "1.3rem" }} />
            </IconButton>
            {/* <IconButton size="small" color="primary">
              <CreateIcon sx={{ fontSize: "1.3rem" }} />
            </IconButton> */}
          </Box>
        </Stack>
        <Box sx={{ marginBottom: "-10px", overflowX: "hidden" }}>
          {alert && <Alert severity="info">{alert}</Alert>}
          <ReactMarkdown
            className="chat-markdown"
            style={{ overflow: "hidden" }}
            children={chatMessage.content}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, "")}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
