(function($) {
  'use strict';

  var app = (function appController() {
    return {
      init:function () {
        console.log('app init');
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="form-register"]').on('submit', this.handleClickSubmit);
      },

      handleClickSubmit: function handleClickSubmit(e) {
        e.preventDefault();
        var $tableRegisterCar = $('[data-js="table-register"]').get();
        $tableRegisterCar.appendChild(app.createNewCar());
        app.clearForm();
        app.handleDataForm();
      },

      handleDataForm: function handleDataForm() {
        var $inputs = new DOM('input');
        $inputs.forEach(function ($input, i, e) {
          console.log($input.value);
        });
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');       
        var $tdImagem = document.createElement('td');
        var $tdMarca = document.createElement('td');
        var $tdAno = document.createElement('td');
        var $tdPlaca = document.createElement('td');
        var $tdCor = document.createElement('td');

        var $imagem = document.createElement('img');

        $tdMarca.textContent =  $('[data-js="brand"]').get().value;  
        $tdAno.textContent =  $('[data-js="year"]').get().value;  
        $tdPlaca.textContent =  $('[data-js="plate"]').get().value;  
        $tdCor.textContent = $('[data-js="color"]').get().value;  
        
        $imagem.setAttribute('src', $('[data-js="image"]').get().value);
        $tdImagem.appendChild($imagem);

        $tr.appendChild($tdImagem);
        $tr.appendChild($tdMarca);
        $tr.appendChild($tdAno);
        $tr.appendChild($tdPlaca);
        $tr.appendChild($tdCor);

        return $fragment.appendChild($tr);
      },

      clearForm: function clearForm() {
        var $form = $('[data-js="form-register"]').get();
        $form.reset();
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', './company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if (app.isReady.call(this))
          return;
        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }

    }
    
  })();

  app.init();





})(window.DOM);
