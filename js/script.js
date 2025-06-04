// 节点数据
const nodesData = [
    { cx: 400, cy: 300, r: 40, fill: "url(#nodeGradient)", text: "兴趣宇宙" },
    { cx: 550, cy: 150, r: 25, fill: "#4a90e2", text: "首页" },
    { cx: 610, cy: 210, r: 25, fill: "#4a90e2", text: "编程博客" },
    { cx: 700, cy: 300, r: 25, fill: "#4a90e2", text: "动态" },
    { cx: 610, cy: 390, r: 25, fill: "#4a90e2", text: "友链" },
    { cx: 550, cy: 450, r: 25, fill: "#4a90e2", text: "关于我" },
    { cx: 250, cy: 150, r: 25, fill: "#50e3c2", text: "旅游系" },
    { cx: 200, cy: 250, r: 25, fill: "#50e3c2", text: "运动系" },
    { cx: 250, cy: 350, r: 25, fill: "#50e3c2", text: "艺术系" },
    { cx: 350, cy: 450, r: 25, fill: "#50e3c2", text: "知识系" }
];

// 连接线数据
const connectionsData = [
    { from: { cx: 400, cy: 300 }, to: { cx: 550, cy: 150 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 610, cy: 210 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 700, cy: 300 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 610, cy: 390 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 550, cy: 450 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 250, cy: 150 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 200, cy: 250 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 250, cy: 350 }, stroke: "#ddd", strokeWidth: 2 },
    { from: { cx: 400, cy: 300 }, to: { cx: 350, cy: 450 }, stroke: "#ddd", strokeWidth: 2 }
];

// 初始化函数
function initMindMap() {
    console.log("初始化思维导图...");

    // 获取 SVG 元素
    const svg = document.querySelector('svg');
    const connectionsGroup = document.getElementById('connections');
    const nodesGroup = document.getElementById('nodes');

    console.log("SVG元素:", svg);
    console.log("连接线组:", connectionsGroup);
    console.log("节点组:", nodesGroup);

    if (!svg || !connectionsGroup || !nodesGroup) {
        console.error("无法找到必要的SVG元素");
        return;
    }

    // 清空现有内容
    nodesGroup.innerHTML = '';
    connectionsGroup.innerHTML = '';

    // 创建节点
    function createNode(node) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.cx);
        circle.setAttribute('cy', node.cy);
        circle.setAttribute('r', node.r);
        circle.setAttribute('fill', node.fill);
        circle.setAttribute('class', 'node');
        nodesGroup.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.cx);
        text.setAttribute('y', node.cy + 5);
        text.setAttribute('font-family', 'Arial');
        text.setAttribute('font-size', node.r < 30 ? 10 : 12);
        text.setAttribute('fill', 'white');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = node.text;
        nodesGroup.appendChild(text);

        // 添加交互效果
        circle.addEventListener('mouseover', function () {
            this.setAttribute('r', parseInt(this.getAttribute('r')) + 5);
            this.setAttribute('filter', 'url(#glow)');
        });

        circle.addEventListener('mouseout', function () {
            this.setAttribute('r', parseInt(this.getAttribute('r')) - 5);
            this.setAttribute('filter', '');
        });

        circle.addEventListener('click', function () {
            addPulseEffect(this);
        });

        return circle;
    }

    // 创建连接线
    function createConnection(connection) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M${connection.from.cx},${connection.from.cy} L${connection.to.cx},${connection.to.cy}`;
        path.setAttribute('d', d);
        path.setAttribute('stroke', connection.stroke);
        path.setAttribute('stroke-width', connection.strokeWidth);
        path.setAttribute('fill', 'none');
        connectionsGroup.appendChild(path);
    }

    // 添加脉动效果
    function addPulseEffect(node) {
        const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const cx = node.getAttribute('cx');
        const cy = node.getAttribute('cy');
        const r = node.getAttribute('r');
        const fill = node.getAttribute('fill');

        pulse.setAttribute('cx', cx);
        pulse.setAttribute('cy', cy);
        pulse.setAttribute('r', r);
        pulse.setAttribute('fill', fill);
        pulse.setAttribute('opacity', '0.5');
        pulse.setAttribute('class', 'pulse');

        node.parentNode.appendChild(pulse);

        const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        anim.setAttribute('attributeName', 'r');
        anim.setAttribute('from', r);
        anim.setAttribute('to', parseInt(r) + 20);
        anim.setAttribute('dur', '1s');
        anim.setAttribute('fill', 'freeze');
        anim.setAttribute('repeatCount', '1');

        const fade = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        fade.setAttribute('attributeName', 'opacity');
        fade.setAttribute('from', '0.5');
        fade.setAttribute('to', '0');
        fade.setAttribute('dur', '1s');
        fade.setAttribute('fill', 'freeze');
        fade.setAttribute('repeatCount', '1');

        pulse.appendChild(anim);
        pulse.appendChild(fade);

        anim.beginElement();
        fade.beginElement();

        setTimeout(() => {
            pulse.remove();
        }, 1000);
    }

    // 添加整体的呼吸效果
    function addBreathingEffect() {
        const centerNode = nodesGroup.querySelector('circle[cx="400"][cy="300"]');
        if (centerNode) {
            const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            anim.setAttribute('attributeName', 'r');
            anim.setAttribute('values', '40;42;40');
            anim.setAttribute('dur', '3s');
            anim.setAttribute('repeatCount', 'indefinite');
            centerNode.appendChild(anim);
            anim.beginElement();
        }
    }

    // 创建所有节点和连接线
    nodesData.forEach(node => createNode(node));
    connectionsData.forEach(connection => createConnection(connection));
    addBreathingEffect();

    console.log("思维导图初始化完成");
}

// 页面加载后初始化
window.addEventListener('load', initMindMap);