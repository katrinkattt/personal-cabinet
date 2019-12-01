function bindRemove(selector){
    $(selector).click(function(){
        initialState.orders.splice(parseInt($(this).attr('data-id')), 1)
        renderRows();
        bindRemove(selector);
        bindChange('.btn-change');
    })
}

function bindChange(selector){
    $(selector).click(function(){
        initialState.modalType = 'change';
        let curId = parseInt($(this).attr('data-id'));
        orderInput.val(initialState.orders[curId].order);
        ownerInput.val(initialState.orders[curId].owner);
        priceInput.val(initialState.orders[curId].price);
        commentInput.val(initialState.orders[curId].comment)
    })
}

function renderRows(){
    let innerBody = '';
    initialState.orders.map((orderObj, id) => {
        innerBody += `
            <tr>
                <th scope="row">${ id + 1 }</th>
                <td>${ orderObj.date }</td>
                <td>${ orderObj.owner }</td>
                <td>${ orderObj.price }</td>
                <td>
                    ${ orderObj.comment }
                </td>
                <td>
                    <button data-id=${id} class="btn btn-success btn-change" data-target="#modal" data-toggle="modal" >
                        Изменить
                    </button>
                    <button data-id=${id} class="btn btn-danger btn-remove">
                        X
                    </button>
                </td>
            </tr>
        `;
    })
    tableBody.html(innerBody);
}

renderRows();
bindRemove('.btn-remove');
bindChange('.btn-change');

btnOpenModal.click(function(){
    initialState.modalType = 'add';
    orderInput.val('');
    ownerInput.val('');
    priceInput.val('');
    commentInput.val('');
})

addOrder.click(function(){
    initialState.orders.push({
        date: (new Date()).toLocaleString(),
        order: $('#order-input').val(),
        owner: $('#owner-input').val(),
        price: $('#price-input').val(),
        comment: $('#comment-input').val()
    });
    renderRows();
    bindRemove('.btn-remove');
    bindChange('.btn-change');
})

