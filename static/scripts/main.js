
function openModal(id = '') {

    let background = $("<div></div>").attr('id', 'background-modal');

    let modal = $("<div></div>").attr('id', 'modal');

    let form = $("<form></form>").attr({
        'id': 'form-modal',
        'method':'post',
        'action': id == '' ? '/insert' : '/update'
    });

    let dayInput = $("<input></input>").attr({
        'type': 'hidden',
        'name': 'day',
        'value': $('#day').val() == '' ? getTodayDateFormated() : $('#day').val()
    })
    
    let titleInput = $("<input></input>").attr({
        'id': 'modal-title',
        'class': 'required',
        'type': 'text',
        'name': 'title',
        'placeholder': 'Título',
        'value': $(`#id${id} .title`).html(),
        'autocomplete': 'off'
    });

    let timeInput = $("<input></input>").attr({
        'id': 'modal-time',
        'class': 'required',
        'type': 'text',
        'name': 'studyTime',
        'placeholder': 'Tempo',
        'value': $(`#id${id} .time`).html(),
        'autocomplete': 'off'
    });

    let contentContainer = $("<div></div>").attr('id', 'content-container');

    let contentInput = $("<textarea></textarea>").attr({
        'id': 'modal-content',
        'class': 'required',
        'name': 'content',
        'placeholder': 'Anotações...',
        'value': $(`#id${id} .content-text`).text(),
        'cols': 30,
        'rows': 10
    });

    let idContainer = $("<input>").attr({
        'type': 'hidden',
        'value': id,
        'name': 'id'
    }) 

    let buttonsContainer = $("<div></div>").attr('id', 'buttons');

    let submitButton = $("<input></input>").attr({
        'id': 'submit',
        'type': 'submit',
        'value': id == '' ? 'Create' : 'Update'
    })

    let cancelButton = $("<button>").attr('id', 'cancel-button').text('Cancelar')

    cancelButton.on('click', hideModal);

    modal.append(form)
    form.append(dayInput)
    form.append(titleInput)
    form.append(timeInput)
    form.append(contentContainer)
    form.append(idContainer)

    contentContainer.append(contentInput)

    form.append(buttonsContainer)
    buttonsContainer.append(submitButton)
    buttonsContainer.append(cancelButton)
    
    $("body").append(background)
    $("body").append(modal)

}

function hideModal() {
    $('#modal').remove();
    $('#background-modal').remove();
}

function readBlocks(date = null) {
    
    $('.block').remove() // clean old blocks

    if(date == null) {
        date = getTodayDateFormated();
    }
    
    $.get("/read", {'day': date} , (blocks) => {
        for(index in blocks) {
            appendBlockInBoard(blocks[index][0],blocks[index][1], blocks[index][2],blocks[index][3])
        }
    })
}

function deleteBlock(id) {
    $(`#id${id}`).remove()
    $.post("/delete", { 'id': id })
}

function appendBlockInBoard(id, title, studyTime, content) {

    $("#quadro").prepend(`

        <div class="block" id="id${id}">
            <h3 class="title">${title}</h3>
                <span class="time">${studyTime}</span>
                <div class="content">
                    <p class="content-text">${content}</p>
                </div>
                <div class="edit" onclick="openModal(${id})">
                    <div id="edit">
                        <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
                <div class="delete" onclick="deleteBlock(${id})">
                    <div id="garbage">
                        <i class="fa-sharp fa-solid fa-trash"></i></div>
                    </div>
                </div>   
        </div>

    `)
}

function getTodayDateFormated() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // os meses começam em 0, por isso é adicionado +1
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}