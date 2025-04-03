const state = {
    cpuCores: 4,
    activeThreads: 0,
    cpuUsage: 0,
    threads: {},
    nextThreadId: 1,
    simulationInterval: null,
    timeElapsed: 0
};
const STATUS = {
    RUNNING: 'running',
    WAITING: 'waiting',
    BLOCKED: 'blocked',
    TERMINATED: 'terminated'
};
function initSystem() {
    state.threads = {};
    state.nextThreadId = 1;
    state.activeThreads = 0;
    state.cpuUsage = 0;
    state.timeElapsed = 0;
    document.getElementById('threadsContainer').innerHTML = '';
    document.getElementById('runtimeTableBody').innerHTML = '';
    updateMetrics();
    addThread(1, 3, 15, STATUS.TERMINATED);
    addThread(2, 2, 5, STATUS.RUNNING);
    addThread(3, 2, 70, STATUS.RUNNING);
    addThread(4, 1, 70, STATUS.RUNNING);
    if (!state.simulationInterval) {
        startSimulation();
    }
}
function startSimulation() {
    if (state.simulationInterval) {
        clearInterval(state.simulationInterval);
    }     
    state.simulationInterval = setInterval(() => {
        state.timeElapsed++;
        updateThreadRuntimes();
        scheduler();
        updateMetrics();
    }, 1000);
}
function addThread(id, priority, runtime, status) {
    const workload = Math.floor(Math.random() * 80) + 20; // Random workload between 20-100
    const thread = {
        id,priority,runtime,status,workload, originalRuntime: runtime
    };
    state.threads[id] = thread;     
    if (status === STATUS.RUNNING) {
        state.activeThreads++;
        updateCpuUsage();
    }
    createThreadCard(thread);
    updateRuntimeTable(thread);           
    return thread;
}
function addRandomThread() {
    const priority = Math.floor(Math.random() * 3) + 1; // 1-3
    const runtime = Math.floor(Math.random() * 50) + 10; // 10-60
    const statusOptions = [STATUS.RUNNING, STATUS.WAITING, STATUS.BLOCKED];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];           
    const thread = addThread(state.nextThreadId++, priority, runtime, status);
    if (status === STATUS.RUNNING && state.activeThreads > state.cpuCores) {
        scheduler();
    }          
    return thread;
}
function createThreadCard(thread) {
    const threadsContainer = document.getElementById('threadsContainer');           
    const card = document.createElement('div');
    card.className = 'thread-card';
    card.id = `thread-${thread.id}`;         
    const statusClass = `status ${thread.status}`;
    const statusText = thread.status.charAt(0).toUpperCase() + thread.status.slice(1);           
    card.innerHTML = `
        <h3><i class="fas fa-microchip"></i> Thread ${thread.id}</h3>
        <span class="${statusClass}">${statusText}</span>
        <p>Priority: 
            <select id="priority-${thread.id}" onchange="changePriority(${thread.id})">
                <option value="1" ${thread.priority === 1 ? 'selected' : ''}>1 (Low)</option>
                <option value="2" ${thread.priority === 2 ? 'selected' : ''}>2 (Medium)</option>
                <option value="3" ${thread.priority === 3 ? 'selected' : ''}>3 (High)</option>
            </select>
        </p>
        <p>Workload: <span class="workload-value">${thread.workload}%</span></p>
        <div class="workload-indicator" style="width: ${thread.workload}%"></div>
        <p>Execution Time: <span id="execution-${thread.id}">${thread.runtime}s</span></p>
        <div class="buttons">
            <button class="btn btn-run" onclick="runThread(${thread.id})">
                <i class="fas fa-play"></i> Run
            </button>
            <button class="btn btn-wait" onclick="waitThread(${thread.id})">
                <i class="fas fa-pause"></i> Wait
            </button>
            <button class="btn btn-block" onclick="blockThread(${thread.id})">
                <i class="fas fa-lock"></i> Block
            </button>
            <button class="btn btn-terminate" onclick="terminateThread(${thread.id})">
                <i class="fas fa-stop"></i> Terminate
            </button>
        </div>
    `;           
    threadsContainer.appendChild(card);
}
function updateRuntimeTable(thread) {
    const tableBody = document.getElementById('runtimeTableBody');
    let row = document.getElementById(`row-${thread.id}`);          
    if (!row) {
        row = document.createElement('tr');
        row.id = `row-${thread.id}`;
        tableBody.appendChild(row);
    }
    const badgeClass = `badge-${thread.status}`;
    const statusText = thread.status.charAt(0).toUpperCase() + thread.status.slice(1); 
    row.innerHTML = `
        <td>${thread.id}</td>
        <td>${thread.priority}</td>
        <td>${thread.runtime}s</td>
        <td><span class="badge ${badgeClass}">${statusText}</span></td>
    `;}
function updateThreadRuntimes() {
    Object.values(state.threads).forEach(thread => {
        if (thread.status === STATUS.RUNNING && thread.runtime > 0) {
            thread.runtime--;
            document.getElementById(`execution-${thread.id}`).textContent = `${thread.runtime}s`;
            updateRuntimeTable(thread);
            if (thread.runtime <= 0) {
                terminateThread(thread.id);
            }}});
}
function runThread(threadId) {
    const thread = state.threads[threadId];
    if (!thread || thread.status === STATUS.RUNNING) return;
    thread.status = STATUS.RUNNING;
    state.activeThreads++;
    updateThreadStatus(threadId, STATUS.RUNNING);
    updateRuntimeTable(thread);
    if (state.activeThreads > state.cpuCores) {
        scheduler();}
    updateCpuUsage();
}
function waitThread(threadId) {
    const thread = state.threads[threadId];
    if (!thread || thread.status !== STATUS.RUNNING) return;
    thread.status = STATUS.WAITING;
    state.activeThreads--;
    updateThreadStatus(threadId, STATUS.WAITING);
    updateRuntimeTable(thread);
    updateCpuUsage();
}
function blockThread(threadId) {
    const thread = state.threads[threadId];
    if (!thread || thread.status !== STATUS.RUNNING) return;
    thread.status = STATUS.BLOCKED;
    state.activeThreads--;
    updateThreadStatus(threadId, STATUS.BLOCKED);
    updateRuntimeTable(thread);
    updateCpuUsage();
}
function terminateThread(threadId) {
    const thread = state.threads[threadId];
    if (!thread) return;
    if (thread.status === STATUS.RUNNING) {
        state.activeThreads--;}
    thread.status = STATUS.TERMINATED;
    updateThreadStatus(threadId, STATUS.TERMINATED);
    updateRuntimeTable(thread);
    updateCpuUsage();}
function updateThreadStatus(threadId, status) {
    const thread = state.threads[threadId];
    if (!thread) return;
    thread.status = status;
    const card = document.getElementById(`thread-${threadId}`);
    if (!card) return;
    const statusElement = card.querySelector('.status');
    if (statusElement) {
        statusElement.className = `status ${status}`;
        statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    }}
function changePriority(threadId) {
    const thread = state.threads[threadId];
    if (!thread) return;           
    const select = document.getElementById(`priority-${threadId}`);
    thread.priority = parseInt(select.value);        
    updateRuntimeTable(thread);
    if (thread.status === STATUS.RUNNING) {
        scheduler();
    } }
function changeCores() {
    const select = document.getElementById('core-selector');
    state.cpuCores = parseInt(select.value);
    document.getElementById('cpu-cores').textContent = state.cpuCores;
    if (state.activeThreads > state.cpuCores) {
        scheduler();}           
    updateCpuUsage();}
function scheduler() {
    if (state.activeThreads <= state.cpuCores) return;
    const runningThreads = Object.values(state.threads)
        .filter(t => t.status === STATUS.RUNNING)
        .sort((a, b) => b.priority - a.priority || a.id - b.id);
    const threadsToWait = state.activeThreads - state.cpuCores;
    for (let i = runningThreads.length - 1; i >= 0 && threadsToWait > 0; i--) {
        waitThread(runningThreads[i].id);}}
function updateCpuUsage() {
    const utilization = Math.min((state.activeThreads / state.cpuCores) * 100, 100);
    state.cpuUsage = utilization;
    document.getElementById('cpu-progress').style.width = `${utilization}%`;
    document.getElementById('cpu-usage').textContent = `${utilization.toFixed(1)}%`;}
function calculateTotalTime() {
    const runningThreads = Object.values(state.threads)
        .filter(t => t.status === STATUS.RUNNING);
    if (runningThreads.length === 0) return 0;
    if (runningThreads.length <= state.cpuCores) {
        return Math.max(...runningThreads.map(t => t.runtime));}
    const totalWork = runningThreads.reduce((sum, t) => sum + t.runtime * t.workload / 100, 0);
    return Math.ceil(totalWork / state.cpuCores);}
function updateMetrics() {
    document.getElementById('active-threads').textContent = state.activeThreads;
    document.getElementById('cpu-cores').textContent = state.cpuCores;
    document.getElementById('total-time').textContent = `${calculateTotalTime()}s`;}
function resetSystem() {
    clearInterval(state.simulationInterval);
    state.simulationInterval = null;
    initSystem();}
window.onload = initSystem;
