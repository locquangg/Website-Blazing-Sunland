// --- Cài Đặt Ban Đầu ---
// THAY THẾ [IP Máy Chủ Của Bạn] BẰNG IP HOẶC TÊN MIỀN SERVER CỦA BẠN
const SERVER_IP = "blazingsunland.fun"; 
const PLAYER_COUNT_ELEMENT = document.getElementById('player-count');
const SERVER_IP_ELEMENT = document.getElementById('server-ip');
const COPY_BUTTON = document.getElementById('copy-button');

// --- 1. Chức Năng Copy IP ---
function setupCopyIp() {
    // Đảm bảo IP hiển thị đúng trong HTML/JS
    SERVER_IP_ELEMENT.textContent = SERVER_IP;

    COPY_BUTTON.addEventListener('click', () => {
        // Sao chép nội dung IP từ thẻ span
        navigator.clipboard.writeText(SERVER_IP_ELEMENT.textContent)
            .then(() => {
                // Thay đổi nút thành thông báo thành công
                COPY_BUTTON.textContent = 'ĐÃ SAO CHÉP!';
                setTimeout(() => {
                    COPY_BUTTON.textContent = 'Sao Chép IP';
                }, 1500); // Đợi 1.5 giây rồi trả về
            })
            .catch(err => {
                console.error('Lỗi khi sao chép: ', err);
                alert('Không thể tự động sao chép. Vui lòng sao chép thủ công: ' + SERVER_IP_ELEMENT.textContent);
            });
    });
}

// --- 2. Chức Năng Lấy Trạng Thái Server ---
function fetchServerStatus() {
    // SỬ DỤNG API TỪ mcsrvstat.us
    const API_URL = `https://api.mcsrvstat.us/2/${SERVER_IP}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                const players = data.players.online;
                const maxPlayers = data.players.max;
                
                PLAYER_COUNT_ELEMENT.textContent = `${players} / ${maxPlayers} Players Online`;
                
                // Giả định: Không có dữ liệu ping trực tiếp từ API này, đặt giá trị mặc định tốt.
                const pingElement = document.getElementById('server-ping');
                pingElement.textContent = `Ping: Rất Tốt`; 

            } else {
                PLAYER_COUNT_ELEMENT.textContent = 'Server Offline';
                document.getElementById('server-ping').textContent = 'Ping: Không sẵn sàng';
            }
        })
        .catch(error => {
            console.error('Lỗi khi fetch trạng thái server:', error);
            PLAYER_COUNT_ELEMENT.textContent = 'Không thể lấy trạng thái';
        });
}


// --- Chạy Các Chức Năng Khi Trang Load ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Chạy chức năng Copy IP
    setupCopyIp();
    
    // 2. Chạy chức năng lấy trạng thái Server
    fetchServerStatus();
    
    // Thêm chức năng cuộn mượt cho menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
