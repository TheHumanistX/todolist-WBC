# General Layout Ideas

## Overall Layout

* Grid, using 12 columns for precise placement of 'pieces'

# Potential Pieces/Components as of 05/20/23

## App.js

* The root component that serves as the entry point of your application. It contains the main layout along with state management for the entire application. It can include context providers or higher-order components for state and handle any global application logic or styles.


## Possible Components


* Lists
  * This component represents the left sidebar and contains all individual task lists. It manages the creation of new task lists, selecting the current task list, and other related actions.
* TaskList
  * Represents an individual task list item within the left sidebar. It displays the task count, completion progress, and tasks-related actions (e.g., edit or delete a list).
* HeaderBar
  * Represents the header bar on top of the tasks area. It displays the current active task list name, tasks completed, and current date.
* WalletConnect 
  * Represents the wallet connect button situated in the top right corner of the app. It manages connectivity to the user's wallet.
* Tasks
  * A card that displays all the tasks for the currently selected task list. It manages task interactions like selecting a task, adding a new task, and other task-related actions.
* Task
  * Represents an individual task within the Tasks component. It displays the task title and task-related actions (e.g., edit or delete a task).
* TaskDetails
  * This card displays the details of the currently selected task or presents a form to create a new task. It contains all the inputs required for adding or editing a task (e.g., task name, due date, description).
* AddButton
  * Reusable AddButton component. This component can handle a click event to open relevant dialogs (add a new task list or add a new task).
* ProgressBar
  * Represents the progress bar in each TaskList card component and also the progress bar displayed at the bottom of each Tasks component
* Status bar/% Complete Bar
* Wallet Connect Button
* List Name, Tasks Completed, Date/Time Top Bar
* Task Lists Side Bar
* Task List Card
* Add Task List Modal
* Tasks Overview Card
* Individual Task Cards/Rows
* Task Detail Overview 
* Add Task Card