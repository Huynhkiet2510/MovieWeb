import { useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { FaShieldAlt, FaBell } from "react-icons/fa";

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
        <div className='bg-page-bg flex flex-col lg:flex-row min-h-screen text-text-main transition-colors duration-300'>
            <div className='flex-1 p-4 lg:p-8'>
                <div className='flex flex-col sm:flex-row justify-between items-center mb-6 lg:mb-8 gap-4'>
                    <h2 className="font-bold text-2xl lg:text-3xl">Thông báo của bạn</h2>
                    {notifications.some(n => !n.isRead) && (
                        <button
                            onClick={() => setNotifications(notifications.map(n => ({ ...n, isRead: true })))}
                            className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                        >
                            Đánh dấu tất cả đã đọc
                        </button>
                    )}
                </div>

                <div className='space-y-3 lg:space-y-4 max-w-4xl mx-auto lg:mx-0'>
                    {notifications.length > 0 ? (
                        notifications.map((noti) => (
                            <div
                                key={noti.id}
                                onClick={() => handleMarkAsRead(noti.id)}
                                className={`flex items-start gap-3 lg:gap-4 p-4 rounded-xl cursor-pointer transition-all border-l-4 
                                    ${noti.isRead
                                        ? 'bg-card-bg border-transparent opacity-70' // Thẻ đã đọc
                                        : 'bg-notification-unread border-red-600 shadow-md hover:bg-card-hover' // Thẻ chưa đọc
                                    }`}
                            >
                                <div className='flex-shrink-0'>
                                    {noti.image ? (
                                        <img src={noti.image} alt="" className='w-16 h-10 lg:w-24 lg:h-14 object-cover rounded-md' />
                                    ) : (
                                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center 
                                            ${noti.isRead ? 'bg-gray-200 dark:bg-gray-800' : 'bg-red-600/10 text-red-600'}`}>
                                            <span className='text-lg lg:text-xl'>
                                                {noti.type === 'security' ? <FaShieldAlt className="text-blue-500" /> : <FaBell className="text-yellow-500" />}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className='flex-1 min-w-0'>
                                    <div className='flex justify-between items-start gap-2'>
                                        <h3 className={`font-semibold text-sm lg:text-base leading-tight ${noti.isRead ? 'text-text-muted' : 'text-text-main'}`}>
                                            {noti.title}
                                        </h3>
                                        <span className='text-[10px] lg:text-xs text-text-muted whitespace-nowrap'>{noti.time}</span>
                                    </div>
                                    <p className={`text-xs lg:text-sm mt-1 line-clamp-2 lg:line-clamp-none ${noti.isRead ? 'text-text-muted/80' : 'text-text-muted'}`}>
                                        {noti.content}
                                    </p>
                                </div>

                                {!noti.isRead && (
                                    <div className='w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0 animate-pulse'></div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className='text-center py-20 text-text-muted'>
                            <p className='text-5xl mb-4'>📭</p>
                            <p className="text-lg">Bạn không có thông báo nào.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NotificationPage