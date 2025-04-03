# Real-Time-Multi-threaded-Application-Simulator-
🚀 A web-based interactive tool to simulate and visualize real-time multi-threading in action! Built with HTML, CSS, and JavaScript, this project helps users understand how multi-threading works by displaying thread execution, priority-based scheduling, CPU core utilization, and real-time thread management.

✨ Features
🧵 Thread Execution Simulation Simulates multiple threads running in parallel.

Shows thread priority levels, execution time, and workload.

🖥️ Interactive Web Interface Allocate new threads with custom priority levels and workload.

Start, pause, block, or terminate threads dynamically.

📊 Visualizations
CPU Utilization Graph: Tracks real-time CPU workload percentage.

Thread Execution Timeline: Displays running, waiting, and terminated threads.

Active & Terminated Threads: Lists the status of each thread.

📈 Metrics Tracking Active vs. Terminated Threads

Total Execution Time

Real-time Workload Distribution

🛠️ Interactive Controls

Add Thread: Create a new thread with a specific priority.
Pause / Resume / Block / Terminate: Manage thread execution dynamically.

Reset Simulation: Clears all threads and resets the system.

📸 Screenshots
Main Interface Displays the list of active and terminated threads.

Shows CPU utilization, execution time, and active cores.

Thread Manager Panel Each thread has controls to start, pause, block, or terminate.

Shows priority (High, Medium, Low) and execution workload.

CPU Utilization Graph Updates in real-time to show workload distribution.

🛠️ Prerequisites 🌐 Modern Web Browser Chrome, Firefox, Edge, or Safari

📦 Languages and Libraries HTML5, CSS3, JavaScript

Chart.js (for rendering graphs)

🚀 Installation
Clone the Repository sh Copy Edit git clone https://github.com/your-username/MultiThreadingVisualizer.git cd MultiThreadingVisualizer Install Dependencies This project uses Chart.js for visualizations. You can include it via a CDN or install it locally using npm.

Option 1: Use CDN (already included in index.html) ✅ No additional setup required.

Option 2: Install via npm sh Copy Edit npm install chart.js Launch the Visualizer Open index.html in your web browser:

Using a Local Server (Recommended) If you're using VS Code, install the Live Server extension and run it.

Or run a simple Python server: sh Copy Edit python -m http.server 8000 Then, navigate to http://localhost:8000 in your browser.

🔧 How to Use 1️⃣ Start the App Open the visualizer in your browser.

2️⃣ Add Threads Click + Add Thread to create a new thread.

Set priority (High, Medium, Low).

Assign workload and execution time.

3️⃣ Monitor Thread Execution The CPU Utilization Graph updates as threads are created or terminated.

The Thread Execution List shows running and waiting threads.

4️⃣ Manage Threads Run: Start a thread.

Wait: Pause thread execution.

Block: Prevent a thread from running.

Terminate: Remove a thread permanently.

5️⃣ Reset the Simulation Click Reset to clear all threads and start over.

🗂️ Code Breakdown 📄 index.html ✨ Defines the structure of the thread manager, execution panel, and visualization charts.

🎨 style.css 💡 Styles the interface, including graph layouts, buttons, and thread panels.

🚀 script.js initCharts(): Initializes CPU utilization and thread workload graphs.

addThread(): Creates a new thread with priority and execution time.

updateThreadStatus(): Manages running, waiting, blocked, and terminated states.

resetSimulation(): Clears all threads and resets charts.

updateVisuals(): Real-time updates to graphs and execution lists.

🌟 Example 🔹 Input Click + Add Thread multiple times to add:

Thread 1 (Priority: High, Workload: 59%)

Thread 2 (Priority: Medium, Workload: 22%)

Thread 3 (Priority: Medium, Workload: 81%)

Thread 4 (Priority: Low, Workload: 89%)

🔹 Action Click Run to execute threads.

Click Collect to simulate scheduling decisions.

🔹 Output CPU Utilization Graph updates to reflect active threads.

Thread Execution List displays running and waiting threads.

Terminated Threads Panel lists stopped threads.
