function sortOrder() {
    const urlparams = window.location.search;
    const urlSearchParams = new URLSearchParams(urlparams);
    const sortby = urlSearchParams.get('sortby'); //get the current sort params value to match the select selected option

    //create the sorting DOM :
    const sortSelect_Container = document.createElement('div');
    sortSelect_Container.id = 'SortContainer';

    //create the custom select wrapper
    const customSelect = document.createElement('div');
    customSelect.classList = 'custom-select';

    //create the selecte element
    var values = ['Date', 'Popularité', 'Titre'];
    var select = document.createElement('select');
    select.name = 'sortSelect';
    select.id = 'sortSelect';
    for (n = 0; n < values.length; n++) {
        var option = document.createElement('option');
        option.value = n;
        option.innerText = values[n].charAt(0).toUpperCase() + values[n].slice(1);
        option.className = '.selectOption';
        select.appendChild(option);
    }
    if (sortby) {
        select.selectedIndex = sortby;
    }
    select.addEventListener('focus', (event) => {
        document.querySelector('.select-selected').style.display = 'none';
    });
    select.addEventListener('focusout', (event) => {
        document.querySelector('.select-selected').style.display = 'flex';
    });
    select.addEventListener('change', reloadWithSortOrder);

    var label = document.createElement('label');
    label.innerHTML = 'Trier par';
    label.htmlFor = 'sortSelect';
    customSelect.appendChild(select);
    sortSelect_Container.appendChild(label);
    sortSelect_Container.appendChild(customSelect);

    /*
     * at this point, manage the select replacment by the custom one
     * =>=>=>
     */
    var duplicatedSelectedItem, duplicatedOptionList, duplicatedOption;
    /*create a new DIV that will act as the selected item:*/
    duplicatedSelectedItem = document.createElement('div');
    duplicatedSelectedItem.setAttribute('class', 'select-selected');
    const duplicatedSelectedItem_text = document.createElement('span');
    duplicatedSelectedItem_text.innerHTML = select.options[select.selectedIndex].innerHTML;
    duplicatedSelectedItem.appendChild(duplicatedSelectedItem_text);
    customSelect.appendChild(duplicatedSelectedItem);
    /*for each element, create a new DIV that will contain the option list:*/
    duplicatedOptionList = document.createElement('div');
    duplicatedOptionList.setAttribute('class', 'select-items select-hide');

    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    for (i = 1; i < select.length; i++) {
        duplicatedOption = document.createElement('div');
        duplicatedOption.innerHTML = select.options[i].innerHTML;
        duplicatedOption.addEventListener('click', function (e) {
            /*when an item is clicked, update the original select box,
        and the selected item:*/
            var y, j, k, h, yl;
            h = this.parentNode.previousSibling;

            for (j = 0; j < select.length; j++) {
                if (select.options[j].innerHTML == this.innerHTML) {
                    select.selectedIndex = j;
                    reloadWithSortOrder();
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName('same-as-selected');
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute('class');
                    }
                    this.setAttribute('class', 'same-as-selected');
                    break;
                }
            }
            h.click();
        });
        duplicatedOptionList.appendChild(duplicatedOption);
    }
    customSelect.appendChild(duplicatedOptionList);
    duplicatedSelectedItem.addEventListener('click', function (e) {
        /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
    });
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
  except the current select box:*/
        var x,
            y,
            i,
            xl,
            yl,
            arrNo = [];
        x = document.getElementsByClassName('select-items');
        y = document.getElementsByClassName('select-selected');
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove('select-arrow-active');
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add('select-hide');
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
    document.addEventListener('click', closeAllSelect);
    /*reload the page with a new parameter if a select option is selected*/
    function reloadWithSortOrder() {
        let params = new URLSearchParams(location.search);
        params.set('sortby', select.selectedIndex);
        console.log(params);
        window.location.search = params.toString();
    }
    return sortSelect_Container;
}
