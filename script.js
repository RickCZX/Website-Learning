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

function openProductModal(data) {
    const modal = document.querySelector('.modal-overlay');
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML = `
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

    modal.classList.add('modal-active');
    history.pushState({ modal: true }, '');
}

function closeModal() {
    document.querySelector('.modal-overlay').classList.remove('modal-active');
    history.back();
}

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