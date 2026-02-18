// Real scenario: To-do list application
class Task {
  constructor(title, priority = 'medium', completed = false) {
    this.title = title;
    this.priority = priority;
    this.completed = completed;
    this.createdAt = new Date();
  }
  
  markComplete() {
    this.completed = true;
    console.log(`✅ Task "${this.title}" completed!`);
  }
  
  getInfo() {
    const status = this.completed ? '✓ Done' : '○ Pending';
    return `[${this.priority}] ${this.title} - ${status}`;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }
  
  addTask(task) {
    this.tasks.push(task);
    console.log(`📝 Added task: "${task.title}"`);
  }
  
  showTasks() {
    console.log('\n📋 Your Tasks:');
    this.tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.getInfo()}`);
    });
  }
}

// Usage
const myTasks = new TaskManager();
myTasks.addTask(new Task('Buy groceries', 'high'));
myTasks.addTask(new Task('Read book', 'low'));
myTasks.addTask(new Task('Pay bills', 'high', false));

myTasks.tasks[0].markComplete();
myTasks.showTasks();