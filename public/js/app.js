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
        
        if (!app.isValidPlate()) {
          alert('O número da placa deve ter 3 letras e 4 números');
          console.log('teste: ', app.isValidPlate());
        } else {
          $tableRegisterCar.appendChild(app.createNewCar());
        }
        app.clearForm();
        app.addCell();
        app.addContentCell();
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();       
        var $tr = document.createElement('tr'); 
        var $inputs = new DOM('input');

        var dataInputs = $inputs.map(function ($input, i, e) {
            return $input.value;
        });
        for (var i = 0; i < dataInputs.length; i++){
          var $td = document.createElement('td');
          if(i === 0) {
            var $tdImagem = document.createElement('td');
            var $imagem = document.createElement('img');
              $imagem.setAttribute('src', $('[data-js="image"]').get().value);
              $tdImagem.appendChild($imagem);
              $tr.appendChild($tdImagem);
          } else if (i <= 4) {
            $td.appendChild(document.createTextNode(dataInputs[i]));
            $tr.appendChild($td);
          }
        }
        return $fragment.appendChild($tr);
      },

      isValidPlate: function isValidPlate(placa) {
        var regexPlaca = new RegExp('(^[a-zA-Z]{3})(\\d{4})');
        placa = $('[data-js="plate"]').get().value;
        var valido = regexPlaca.test(placa);
          if(valido)
              return true;
          else
              return false;
      },

      clearForm: function clearForm() {
        var $form = $('[data-js="form-register"]').get();
        $form.reset();
      },

      addCell : function addCell() {
          var tableCars = document.getElementById("table-cars");
          var rows = [].slice.call(tableCars.rows);

          var result = rows.map(function(row){
                var $getTds = row.getElementsByTagName("td").length;
                      if ( $getTds === 5) {
                          return row.insertCell(-1).setAttribute('data-js', 'edit-cell');
                      }
                });
      },

      addContentCell : function addContentCell () {
          var $editCell = $('[data-js="edit-cell"]').get();

          $editCell.textContent = 'remover';
          console.log($editCell);
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
