
function openModal(id = '', prevTitle = '', prevContent = '', prevTime = '') {
    
    let background = $("<div></div>").attr('id', 'background-modal');

    let modal = $("<div></div>").attr('id', 'modal');

    let form = $("<form></form>").attr({
        'id': 'form-modal',
        'method':'post'
    });
    
    let titleInput = $("<input></input>").attr({
        'id': 'modal-title',
        'class': 'required',
        'type': 'text',
        'name': 'title',
        'placeholder': 'Título',
        'value': prevTitle,
        'autocomplete': 'off'
    });

    let timeInput = $("<input></input>").attr({
        'id': 'modal-time',
        'class': 'required',
        'type': 'text',
        'name': 'studyTime',
        'placeholder': 'Tempo',
        'value': prevTime,
        'autocomplete': 'off'
    });

    let contentContainer = $("<div></div>").attr('id', 'content-container');

    let contentInput = $("<textarea></textarea>").attr({
        'id': 'modal-content',
        'class': 'required',
        'name': 'content',
        'placeholder': 'Anotações...',
        'value': prevContent,
        'cols': 30,
        'rows': 10
    });

    let reviewContainer = $("<div></div>").attr('id', 'review-container');

    let label1 = $('<label></label>').attr({
        'id': 'label-1',
        'for': 'review-1'
    });

    let review1 = $("<input></input>").attr({
        'id': 'review-1',
        'class': 'review-check',
        'type': 'checkbox',
        'name': 'review-1',
        'value': '1',
    });

    let label7 = $('<label></label>').attr({
        'id': 'label-7',
        'for': 'review-7'
    });

    let review7 = $("<input></input>").attr({
        'id': 'review-7',
        'class': 'review-check',
        'type': 'checkbox',
        'name': 'review-7',
        'value': '7',
    });

    let label30 = $('<label></label>').attr({
        'id': 'label-30',
        'for': 'review-30'
    });

    let review30 = $("<input></input>").attr({
        'id': 'review-30',
        'class': 'review-check',
        'type': 'checkbox',
        'name': 'review-30',
        'value': '30',
    });
    
    let label60 = $('<label></label>').attr({
        'id': 'label-60',
        'for': 'review-60'
    });

    let review60 = $("<input></input>").attr({
        'id': 'review-60',
        'class': 'review-check',
        'type': 'checkbox',
        'name': 'review-60',
        'value': '60',
    });

    let buttonsContainer = $("<div></div>").attr('id', 'buttons');

    let submitButton = $("<input></input>").attr({
        'id': 'submit',
        'type': 'submit',
        'value': id == '' ? 'createBlock' : 'updateBlock'
    })

    submitButton.on('click', insertBlock)

    let cancelButton = $("<button>").attr('id', 'cancel-button').text('Cancelar')

    cancelButton.on('click', hideModal);

    modal.append(form)
    form.append(titleInput)
    form.append(timeInput)
    form.append(contentContainer)

    contentContainer.append(contentInput)

    form.append(reviewContainer)
    reviewContainer.append(label1)
    label1.append(review1)
    label1.append('Amanhã')

    reviewContainer.append(label7)
    label7.append(review7)
    label7.append('7 Dias')

    reviewContainer.append(label30)
    label30.append(review30)
    label30.append('30 Dias')

    reviewContainer.append(label60)
    label60.append(review60)
    label60.append('60 Dias')

    form.append(buttonsContainer)
    buttonsContainer.append(submitButton)
    buttonsContainer.append(cancelButton)
    
    $("body").append(background)
    $("body").append(modal)

}

function hideModal() {
    let modal = document.querySelector('#modal');
    let fundo = document.querySelector('#fundo_modal')
    modal.remove();
    fundo.remove();
}

function insertBlock() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:4000/api.js/inserir",
        data: `day=2023-03-24`,
        success: dados => console.log(dados),
        error: erro => console.log(erro)
    })

}

function readBlocks() {
    $.get("http://localhost:3000/read", (data, status) => {
        console.log(`Data: ${JSON.stringify(data)} \n Status: ${status}`)
    })
}

function updateBlock() {
    $.post("http://localhost:4000/api.js?q=updateBlock", (data) => {
        $("#modal-title").text()
    })
}

function deleteBLock(id) {
    $.post("http://localhost:4000/api.js?q=deleteBlock", (data, status) => {
        console.log(`Data: ${data} \n Status: ${status}`)
    })
}
