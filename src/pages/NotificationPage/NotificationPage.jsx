import React, { useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'new_episode',
        title: 'Tập mới ra mắt',
        content: 'Tập 5 bộ phim "Squid Game: Season 2" đã có bản Vietsub.',
        time: '10 phút trước',
        isRead: false,
        image: null
    },
    {
        id: 2,
        type: 'system',
        title: 'Cập nhật hệ thống',
        content: 'Tính năng "Xem cùng bạn bè" đã được kích hoạt. Thử ngay!',
        time: '2 giờ trước',
        isRead: false,
        image: null
    },
    {
        id: 3,
        type: 'promotion',
        title: 'Ưu đãi đặc biệt',
        content: 'Nâng cấp gói Premium chỉ với 19.000đ trong tháng này.',
        time: '1 ngày trước',
        isRead: false,
        image: null
    },
    {
        id: 4,
        type: 'new_movie',
        title: 'Phim Marvel mới',
        content: 'Series "Loki: Season 2" đã cập nhật trọn bộ bản 4K.',
        time: '2 ngày trước',
        isRead: false,
        image: null
    },
    {
        id: 5,
        type: 'security',
        title: 'Bảo mật tài khoản',
        content: 'Tài khoản của bạn vừa đăng nhập trên một thiết bị lạ tại TP.HCM.',
        time: '3 ngày trước',
        isRead: true,
        image: null
    }
];

const NotificationPage = () => {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    return (
        <div className='flex min-h-scree'>
            <SideBar />

            <div className='flex-1 p-6'>

                <div className='flex justify-between items-center mb-8'>
                    <h2 className="font-bold text-3xl mb-6">Danh sách mong muốn</h2>

                </div>

                {/* List Notifications */}
                <div className='space-y-4'>
                    {notifications.length > 0 ? (
                        notifications.map((noti) => (
                            <div
                                key={noti.id}
                                onClick={() => handleMarkAsRead(noti.id)}
                                className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all border-l-4 
                    ${noti.isRead ? 'bg-[#1f1f1f] border-transparent opacity-70' : 'bg-[#2b2b2b] border-red-600 shadow-lg'}`}
                            >
                                <div className='flex-shrink-0'>
                                    {noti.image ? (
                                        <img src={noti.image} alt="" className='w-24 h-14 object-cover rounded' />
                                    ) : (
                                        <div className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center'>
                                            <span className='text-xl'>🔔</span>
                                        </div>
                                    )}
                                </div>

                                <div className='flex-1'>
                                    <div className='flex justify-between'>
                                        <h3 className={`font-semibold ${noti.isRead ? 'text-gray-400' : 'text-white'}`}>
                                            {noti.title}
                                        </h3>
                                        <span className='text-xs text-gray-500'>{noti.time}</span>
                                    </div>
                                    <p className='text-sm text-gray-400 mt-1'>{noti.content}</p>
                                </div>

                                {!noti.isRead && (
                                    <div className='w-2 h-2 bg-red-600 rounded-full mt-2'></div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-20 text-gray-500'>
                            <p className='text-4xl mb-4'>📭</p>
                            <p>Bạn không có thông báo nào.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default NotificationPage