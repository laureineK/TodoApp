# Overkill Todo - Project instructions

Our fantastic product owner has a wonderful, amazing and revolutionary idea... he wants to build a new Todo application.
He has a pretty accurate vision of what he wants, and so comes with a backlog containing the following user stories:

## User stories

### 1: List my TODOs

#### Description:

As a user I would like to list my current todos

#### Acceptance criterias:

- Each todo has, at minimal, a related state and title
- Some hard-coded todos are initialized in this context for demonstration purpose

### 2: Change a TODO state

#### Description:

As a user I would like to change a todo state by checking a "box"

#### Acceptance criteria:

- When I toggle a checkbox displayed beside todo's title, I toggle todo's state (done / undone)
- When a todo is done, it is placed at the bottom of the list, and displayed "crossed out"

### 3: Detail a TODO

#### Description:

As a user I would like to display one of my todo in a separate or dedicated view.
This todo will contain its title and a description (which is a new information not shown in the previous view).

#### Acceptance criteria:

- I can click on a todo (by any way) to access the "detail" view of corresponding todo
- The todo can be accessed via a unique URL

### 4: Add a new TODO

#### Description:

As a user I would like to add a new todo in my list

#### Acceptance criteria:

- The todo's title is required
- The todo's description can be empty
- The newly created todo is added on top of the todos list
- You are free to choose the design / interaction

---
