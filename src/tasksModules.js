let defaultToDo = [];

function ToDo(title, description, dueDate, priority, project, uid) {
    let toDo = {
        title,
        description,
        dueDate,
        priority,
        project,
        uid,
    }
    return Object.assign(
        toDo,
        remover(toDo),
        handleEdit(toDo),
    )
}

const remover = (state) => ({
    remove(index) {
        defaultToDo.splice(index, 1)
    }
})

const handleEdit = (state) => ({
    edit(index, newtitle) {
        defaultToDo[index].title = newtitle
    }
})

export { defaultToDo, ToDo }