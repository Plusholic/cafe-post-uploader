import React, { useState } from 'react';
import axios from 'axios';
import { format, parse } from 'date-fns';

const NaverCalendar = () => {
    const [schedule, setSchedule] = useState({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        startTime: '09:00',
        endTime: '10:00',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const createSchedule = async (e) => {
        e.preventDefault();
        try {
            // 날짜와 시간을 결합하여 완전한 datetime 문자열 생성
            const startDateTime = parse(
                `${schedule.date} ${schedule.startTime}`,
                'yyyy-MM-dd HH:mm',
                new Date()
            );
            const endDateTime = parse(
                `${schedule.date} ${schedule.endTime}`,
                'yyyy-MM-dd HH:mm',
                new Date()
            );

            const now = new Date();
            const uid = `event-${format(now, "yyyyMMddHHmmss")}-${Math.random().toString(36).substr(2, 8)}`;

            const scheduleIcalString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:Naver Calendar
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:Asia/Seoul
BEGIN:STANDARD
DTSTART:19700101T000000
TZNAME:GMT+09:00
TZOFFSETFROM:+0900
TZOFFSETTO:+0900
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
SEQUENCE:0
CLASS:PUBLIC
TRANSP:OPAQUE
UID:${uid}
DTSTART;TZID=Asia/Seoul:${format(startDateTime, "yyyyMMdd'T'HHmmss")}
DTEND;TZID=Asia/Seoul:${format(endDateTime, "yyyyMMdd'T'HHmmss")}
SUMMARY:${schedule.title}
DESCRIPTION:https://main.d36rgqn90fjue.amplifyapp.com/\n${schedule.description}
LOCATION:${schedule.location}
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER:PT2M
END:VALARM
CREATED:${format(now, "yyyyMMdd'T'HHmmss'Z'")}
LAST-MODIFIED:${format(now, "yyyyMMdd'T'HHmmss'Z'")}
DTSTAMP:${format(now, "yyyyMMdd'T'HHmmss'Z'")}
END:VEVENT
END:VCALENDAR`;

            const requestData = {
                calendarId: "defaultCalendarId",
                scheduleIcalString: scheduleIcalString,
                user_id: localStorage.getItem('userId')
            };

            const response = await axios.post(
                process.env.REACT_APP_CALENDAR_ENDPOINT,
                requestData
            );

            if (response.status === 200) {
                alert('일정이 생성되었습니다.');
            }
        } catch (error) {
            console.error('일정 생성 중 에러:', error);
            alert('일정 생성에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <form onSubmit={createSchedule} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">일정 이름</label>
                    <input
                        type="text"
                        name="title"
                        value={schedule.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">날짜</label>
                    <input
                        type="date"
                        name="date"
                        value={schedule.date}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">시작 시간</label>
                        <input
                            type="time"
                            name="startTime"
                            value={schedule.startTime}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">종료 시간</label>
                        <input
                            type="time"
                            name="endTime"
                            value={schedule.endTime}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">장소</label>
                    <input
                        type="text"
                        name="location"
                        value={schedule.location}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">상세 내용</label>
                    <textarea
                        name="description"
                        value={schedule.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    일정 생성
                </button>
            </form>
        </div>
    );
};

export default NaverCalendar;