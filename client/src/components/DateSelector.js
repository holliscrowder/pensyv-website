import React, { useEffect, useState } from "react";

export default function DateSelector ( {dates, setDates}) {

    return (
        <form>
            <label htmlFor = "dateRange">Select Date Range</label>
            <br />
            <select 
                id = "dateRange"
                value = {dates}
                onChange = {(event) => {
                        setDates(event.target.value)
                    }}
            >
                <option value = "oneMonth" label = "30 Days">
                    30 Days
                </option>
                <option value = "threeMonths" label = "90 Days">
                    90 Days
                </option>
                <option value = "oneYear" label = "1 Year">
                    One Year
                </option>
                <option value = "allTime" label = "All Time">
                    All Time
                </option>
            </select>
        </form>
    )
}