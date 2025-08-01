// UserDashboard.jsx

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Avatar,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";

const jobs = [
  {
    jobTitle: "Frontend Developer",
    company: "NOIR Capital",
    roundsCompleted: 2,
    totalRounds: 4,
    progressPercent: 50,
    status: "In Progress",
  },
  {
    jobTitle: "Backend Engineer",
    company: "NOIR Capital",
    roundsCompleted: 4,
    totalRounds: 4,
    progressPercent: 100,
    status: "Accepted",
  },
  {
    jobTitle: "UI/UX Designer",
    company: "NOIR Capital",
    roundsCompleted: 4,
    totalRounds: 4,
    progressPercent: 100,
    status: "Rejected",
  },
];

const statusConfig = {
  "Accepted": {
    color: "success",
    label: "Accepted",
    icon: <CheckCircleIcon sx={{ color: "#43e97b" }} />,
    chipColor: "#43e97b",
    emoji: "✅",
  },
  "Rejected": {
    color: "error",
    label: "Rejected",
    icon: <CancelIcon sx={{ color: "#e53935" }} />,
    chipColor: "#e53935",
    emoji: "❌",
  },
  "In Progress": {
    color: "warning",
    label: "In Progress",
    icon: <AccessTimeIcon sx={{ color: "#f9d423" }} />,
    chipColor: "#f9d423",
    emoji: "🕒",
  },
};

const drawerWidth = 220;


export default function JobDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Main content for each tab
  const renderMainContent = () => {
    if (activeTab === "dashboard") {
      return (
        <>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, letterSpacing: 1, color: "#fff" }}>
            Job Application Status
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ maxWidth: 1100 }}>
            {jobs.map((job, idx) => {
              const status = statusConfig[job.status] || statusConfig["In Progress"];
              return (
                <Grid item xs={12} sm={6} md={4} key={idx} sx={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: 4,
                      transition: "box-shadow 0.2s, transform 0.2s",
                      "&:hover": {
                        boxShadow: 10,
                        transform: "scale(1.04)",
                      },
                      textAlign: "center",
                      py: 2,
                      px: 2,
                      width: "100%",
                      maxWidth: 340,
                      minWidth: 220,
                      margin: "0 auto",
                      background: "linear-gradient(135deg, #23243a 60%, #181a20 100%)",
                      color: "#fff",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: "1.15rem", color: "#d4af37" }}>
                        {job.jobTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, color: "#bbb" }}>
                        {job.company}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, color: "#fff" }}>
                          Rounds Completed: <span style={{ color: "#d4af37", fontWeight: 700 }}>{job.roundsCompleted} / {job.totalRounds}</span>
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={job.progressPercent}
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            background: "#222",
                            "& .MuiLinearProgress-bar": {
                              background:
                                job.status === "Accepted"
                                  ? "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)"
                                  : job.status === "Rejected"
                                  ? "linear-gradient(90deg, #e53935 0%, #e35d5b 100%)"
                                  : "linear-gradient(90deg, #f9d423 0%, #ff4e50 100%)",
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#888" }}>
                          {job.progressPercent}% completed
                        </Typography>
                      </Box>
                      <Chip
                        icon={status.icon}
                        label={<span>{status.emoji} {status.label}</span>}
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          mt: 2,
                          px: 2,
                          borderRadius: 2,
                          background: status.chipColor,
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      );
    }
    if (activeTab === "applied") {
      return (
        <Box sx={{ mt: 6, maxWidth: 700, mx: "auto", background: "#23243a", borderRadius: 4, boxShadow: 4, p: 4, color: "#fff" }}>
          <Typography variant="h5" sx={{ color: "#d4af37", mb: 2 }}>
            My Applied Jobs
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here are the jobs you have applied for:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Frontend Developer" secondary="Applied on July 10, 2025" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Backend Engineer" secondary="Applied on July 12, 2025" />
            </ListItem>
            <ListItem>
              <ListItemText primary="UI/UX Designer" secondary="Applied on July 15, 2025" />
            </ListItem>
          </List>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "linear-gradient(90deg, #181a20 0%, #23243a 100%)" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: drawerWidth,
          position: "absolute",
          top: "90px",
          left: 0,
          height: "80vh",
          background: "#23243a",
          color: "white",
          zIndex: 10,
          borderTopLeftRadius: 18,
          borderBottomLeftRadius: 18,
          boxShadow: "0 4px 24px rgba(40,40,40,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 4,
        }}
      >
        <Divider sx={{ bgcolor: "#23243a", mb: 2, width: "80%" }} />
        <List sx={{ width: "100%" }}>
          <ListItem button selected={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); }}> 
            <ListItemIcon sx={{ color: "#d4af37" }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button selected={activeTab === "applied"} onClick={() => { setActiveTab("applied"); }}> 
            <ListItemIcon sx={{ color: "#d4af37" }}><WorkIcon /></ListItemIcon>
            <ListItemText primary="Applied Jobs" />
          </ListItem>
        </List>
      </Box>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px`, p: { xs: 2, md: 6 }, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
        {renderMainContent()}
      </Box>
    </Box>
  );
}
