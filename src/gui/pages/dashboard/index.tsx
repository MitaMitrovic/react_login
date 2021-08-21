import React from "react";
import { Card } from "reactstrap";
import './css/Dashboard.css'

export default function Dashboard() {
    return (
        <div className="dashboardContent">
            <Card className="dashboardCard">
                <h1>Welcome to Dashboard</h1>
            </Card>
        </div>);
}