// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 商品卡点击事件
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productData = {
                title: card.dataset.title,
                price: card.dataset.price,
                desc: card.dataset.desc
            };
            openProductModal(productData);
        });
    });

    // 关闭模态框
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    document.querySelector('.modal-close').addEventListener('click', closeModal);
});

function openProductModal(card) {
    const productData = {
        title: card.dataset.title,
        price: card.dataset.price,
        material: card.dataset.material,
        size: card.dataset.size,
        color: card.dataset.color,
        desc: card.dataset.desc
    };

    const modalHtml = `
        <div class="modal-content">
            <button class="modal-close-btn">&times;</button>
            <h2>${productData.title}</h2>
            
            <div class="product-details">
                <div class="detail-item">
                    <span class="detail-label">价格</span>
                    <span class="detail-value">¥${productData.price}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">材质</span>
                    <span class="detail-value">${productData.material}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">尺寸</span>
                    <span class="detail-value">${productData.size}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">颜色</span>
                    <span class="detail-value">${productData.color}</span>
                </div>
                <div class="full-width">
                    <h3>产品描述</h3>
                    <p>${productData.desc}</p>
                </div>
            </div>
            
            <button class="cta-button">加入购物车</button>
        </div>
    `;

    const modal = document.querySelector('.modal-overlay');
    modal.innerHTML = modalHtml;
    modal.style.display = 'flex';
    
    // 新增关闭事件
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
}

// 修改关闭函数
function closeModal(e) {
    // 只有当点击遮罩层或关闭按钮时关闭
    if(e.target === document.querySelector('.modal-overlay') || e.target.closest('.modal-close-btn')) {
        document.querySelector('.modal-overlay').style.display = 'none';
    }
}

// 添加ESC键关闭支持
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        document.querySelector('.modal-overlay').style.display = 'none';
    }
});

// 处理浏览器返回按钮
window.addEventListener('popstate', (event) => {
    if (!event.state?.modal) {
        closeModal();
    }
});

// 更新 script.js 添加以下功能
function initPage() {
    // 设置当前导航激活状态
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.href.endsWith(currentPage));
    });

    // 初始化商品卡片
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productData = {
                title: card.dataset.title,
                price: card.dataset.price,
                desc: card.dataset.desc
            };
            openProductModal(productData);
        });
    });
}

// 在DOM加载时初始化
document.addEventListener('DOMContentLoaded', initPage);

// 添加窗口关闭时的历史处理
window.addEventListener('popstate', (event) => {
    if (!event.state?.modal) {
        closeModal();
    }
});

// 优化模态框内容生成
function generateModalContent(data) {
    return `
        <div class="modal-header">
            <h2>${data.title}</h2>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-image"></div>
        <div class="modal-info">
            <h3 class="price">¥${data.price}</h3>
            <p>${data.desc}</p>
            <button class="cta-button">加入购物车</button>
        </div>
    `;
}
