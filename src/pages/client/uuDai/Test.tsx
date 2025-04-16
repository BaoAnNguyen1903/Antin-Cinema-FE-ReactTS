import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi"); // để hiện "Thứ X"

const WeekDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Lấy thứ 4 tuần hiện tại làm mốc giống ảnh
  const getWeekDates = () => {
    const today = dayjs();
    const start = today.startOf("week").add(2, "day"); // thứ 4
    return Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
  };

  const weekDates = getWeekDates();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        fontFamily: "sans-serif"
      }}
    >
      {weekDates.map((date) => {
        const isSelected = date.isSame(selectedDate, "day");
        const isToday = date.isSame(dayjs(), "day");

        return (
          <div
            key={date.format("YYYY-MM-DD")}
            onClick={() => setSelectedDate(date)}
            style={{
              textAlign: "center",
              cursor: "pointer",
              color: isSelected ? "#000" : "#333"
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 8 }}>
              {date.format("dddd")}
            </div>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                lineHeight: "50px",
                margin: "0 auto",
                backgroundColor: isSelected
                  ? "#ff4d00"
                  : isToday
                  ? "#d9d9d9"
                  : "transparent",
                color: isSelected ? "#fff" : "#000",
                fontSize: 18,
                transition: "all 0.3s ease"
              }}
            >
              {date.date()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeekDatePicker;
