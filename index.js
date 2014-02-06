
document.addEventListener("deviceready", onDeviceReady, false);


function onDeviceReady() {}


function onLoad(){

      $(document).ready(function(){

    

     
      $.support.cors = true;
      $("#btn-group-hidden").hide();
      $('#btn-group-hidden').button();    // activate group buttons
      $(".noDataMessage").hide();
      $('.btn-default[name=svi]').addClass('active');   // button "svi" to be default selected
      $("#hiddenField").val("svi");
      var mainArrayData =[];
      mainArrayData.push({'Firstname': 'Zvonimir', 'Lastname': 'Novoselec', 'ClanId': '5269F9D9-E45F-E211-9EE7-000C29919411', 'Years': '34', 'TaskStatus': 'open'});
      mainArrayData.push({'Firstname': 'Mišela', 'Lastname': 'Mustafic', 'ClanId': 'E668F9D9-E45F-E211-9EE7-000C29919411', 'Years': '63', 'TaskStatus': 'completed'});
      mainArrayData.push({'Firstname': 'test', 'test1': 'Novoselec', 'ClanId': 'C0F6E344-319C-E211-88FC-000C29919411', 'Years': '22', 'TaskStatus': 'cancelled'});

      var unsuccessefullyAjaxSendData = [];
      var flagFirstBackButton = false;


      // start of the function after login button click
      $("#btn_ok").click(function(){

      // unsuccessefullyAjaxSendData.push({'idVotingPlace': 7141, 'IdOfSelectedClan': 'E4114D9D-ED88-E311-848F-000C29919411', 'openCompletedCancelled': 'cancelled' });
      // unsuccessefullyAjaxSendData.push({'idVotingPlace': 7141, 'IdOfSelectedClan': '1ACEEAB7-C676-E211-88FC-000C29919411', 'openCompletedCancelled': 'cancelled' });
      
      var username = $("#inputEmail").val();  
      var idVotingPlace = 7141;
     

      if(idVotingPlace==0){    // unsuccessful login
      $('#errorLogin').modal('show');
      $("#inputEmail").val("");
      }
      else{      // successful login
     
      if(mainArrayData.length != 0)
      {
      $("#login").hide();
      $("#btn-group-hidden").show();
      DisplayResult(mainArrayData, $("#hiddenField").val());
      }
      else {
      $(".noDataMessage").show();
      $("#btn-group-hidden").hide();
      }
     
      }


      $('.result-container').unbind().on("click","a",function(e) {
      var IdOfSelectedClan = $(this).attr('id');
      var currentTaskStatusOfSelectedClan = $(this).attr('name');
      SetDataOnModal(currentTaskStatusOfSelectedClan);


      $('#myModal a').unbind().on("click",function() {   // start of "click" event handler on selected Clan
      var chosenTaskStatus = $(this).attr('name');
      ChangeTaskActivityStatusOfThisUser(mainArrayData, IdOfSelectedClan, chosenTaskStatus);      //this function change data directly in UI
      GetChangeTaskActivityStatusOfThisUser(idVotingPlace, IdOfSelectedClan, chosenTaskStatus);   //this function makes Ajax call to change data into CRM
      });

      });    // end of "click" event handler on selected Clan



      $('#btn-group-hidden .btn-default').click(function() {
      var chosenTab = $(this).attr('name');
      $("#hiddenField").val(chosenTab);
      DisplayResult(mainArrayData, chosenTab);
      });



      }) // end of the function after login button click








      function SetDataOnModal(currentTaskStatusOfSelectedClan)
      {
      if(currentTaskStatusOfSelectedClan=="open")
      {  $("#firstImageTd a").attr("name","completed");  $("#firstImage").attr("src","tick.png");  $("#firstTextTd").html("completed");
      $("#secondImageTd a").attr("name","cancelled");  $("#secondImage").attr("src","block.png");  $("#secondTextTd").html("cancelled");
      }
      else if(currentTaskStatusOfSelectedClan=="completed")
      {  $("#firstImageTd a").attr("name","open");  $("#firstImage").attr("src","add.png");  $("#firstTextTd").html("open");
      $("#secondImageTd a").attr("name","cancelled");  $("#secondImage").attr("src","block.png");  $("#secondTextTd").html("cancelled");
      }
      else if(currentTaskStatusOfSelectedClan=="cancelled")
      {  $("#firstImageTd a").attr("name","open");  $("#firstImage").attr("src","add.png");  $("#firstTextTd").html("open");
      $("#secondImageTd a").attr("name","completed");  $("#secondImage").attr("src","tick.png");  $("#secondTextTd").html("completed");
      }
      $('#myModal').modal('show');
      }







      function CheckIfUnsuccessfullyArrayIsEmptyAndReleaseBackButtonEventHandler()
      {
      if(unsuccessefullyAjaxSendData.length == 0)
      {
      if(flagFirstBackButton == true)
      {
      document.removeEventListener("backbutton",onBackKeyDown,false);
      }
      }
      else
      {
      flagFirstBackButton = true;
      document.addEventListener("backbutton", onBackKeyDown, false);
      }
      }





      //event handler for back button if there are still data
      function onBackKeyDown() {
      if(unsuccessefullyAjaxSendData.length !=0)
      {
      $("#stillData").modal('show');
      }
      }





      function DisplayResult(array, sviPreostaliEvidentirani)
      {
      $(".result-container").html("");
      if(sviPreostaliEvidentirani == "svi")
      {
      $.each(array, function(index, element){
      $(".result-container").append('<div class="row-item ' + $.trim(element.TaskStatus) + '"><a class="img_btn ' + $.trim(element.TaskStatus) + '" name="' + $.trim(element.TaskStatus) + '" id="'+element.ClanId+'"/>' + element.Lastname + ' ' + element.Firstname + ' (' + element.Years + ')</div>');
       
      });
      }
      else if(sviPreostaliEvidentirani == "preostali")
      {
      $.each(array, function(index, element){
      if(element.TaskStatus == "open"){
      $(".result-container").append('<div class="row-item ' + $.trim(element.TaskStatus) + '"><a class="img_btn ' + $.trim(element.TaskStatus) + '" name="' + $.trim(element.TaskStatus) + '" id="'+element.ClanId+'"/>' + element.Lastname + ' ' + element.Firstname + ' (' + element.Years + ')</div>');
       
      }
      });
      }
      else if(sviPreostaliEvidentirani == "evidentirani")
      {
      $.each(array, function(index, element){
      if(element.TaskStatus == "completed" || element.TaskStatus == "cancelled"){
      $(".result-container").append('<div class="row-item ' + $.trim(element.TaskStatus) + '"><a class="img_btn ' + $.trim(element.TaskStatus) + '" name="' + $.trim(element.TaskStatus) + '" id="'+element.ClanId+'"/>' + element.Lastname + ' ' + element.Firstname + ' (' + element.Years + ')</div>');
       
      }
      });
      }

      }







      // da se vidi slucajot uste koga nema clenovi na ova izborno mesto, sto kje vrati ajaxot, dali error ili if(data==null)
      function GetAllClanoviOfThisVotingPlace(idVotingPlace, sviPreostaliEvidentirani)
      {
      var arr = [];
      $.ajax({
      type: "GET",
      async: false,
      url: "http://localhost:35512/api/values/GetAllClanoviOfThisVotingPlace",
      dataType:"json",
      data:{idVotingPlace :idVotingPlace},
      contentType: "application/json; charset=utf-8",
      success: function (data, textStatus, XmlHttpRequest) {

      $.each(data, function(index, value) {
      var arrFamily =  [];
      $.each(value.Family, function(indexF, valueF){
      arrFamily.push({'Firstname': valueF.Firstname, 'Lastname': valueF.Lastname, 'ClanId': valueF.ClanId, 'Years': valueF.Years, 'TaskStatus': valueF.TaskStatus});
      });
      arr.push({'Firstname': value.Firstname, 'Lastname': value.Lastname, 'ClanId': value.ClanId, 'Years': value.Years, 'TaskStatus': value.TaskStatus, 'Family': arrFamily});
      });
      $("#login").hide();
      $("#btn-group-hidden").show();

      },    // end of success
      error: function(xhr, textStatus, errorThrown) {
      }
      });
      return arr;
      }





      // this function is calling every 60 seconds
      function TrySendUnsuccessfullyAjaxSentData()
      {
      if(unsuccessefullyAjaxSendData.length !=0)
      {
      $.each(unsuccessefullyAjaxSendData, function(index, element){
      GetChangeTaskActivityStatusOfThisUser(element.idVotingPlace, element.IdOfSelectedClan, element.openCompletedCancelled, index);
      });
      }
      }






      // this function makes changes in CRM server via ajax calls
      function GetChangeTaskActivityStatusOfThisUser(idVotingPlace, IdOfSelectedClan, openCompletedCancelled, index){
      $.ajax({
      type: "GET",
      url: "http://localhost:35512/api/values/GetChangeTaskActivityStatusOfThisUser",
      dataType:"json",
      data:{votingPlaceId:idVotingPlace, contactId:IdOfSelectedClan, openCompletedCancelled:openCompletedCancelled},
      contentType: "application/json; charset=utf-8",
      success: function (data, textStatus, XmlHttpRequest) {

      var exist = CheckIfElementExistInArray(unsuccessefullyAjaxSendData,IdOfSelectedClan );
      if(exist == true)
      {
      unsuccessefullyAjaxSendData.splice(index,1);
      }
      $("#count").text("success: " + unsuccessefullyAjaxSendData.length);
      },
      error: function(xhr, textStatus, errorThrown) {
      var exist = CheckIfElementExistInArray(unsuccessefullyAjaxSendData,IdOfSelectedClan );
      if(exist == false)
      {
      unsuccessefullyAjaxSendData.push({'idVotingPlace': idVotingPlace, 'IdOfSelectedClan': IdOfSelectedClan, 'openCompletedCancelled': openCompletedCancelled});
      }
      $("#count").text("error: " + unsuccessefullyAjaxSendData.length);
      }
      });
      }






      // this function makes changes on data TaskStatus directly on the UI, and update the content
      function ChangeTaskActivityStatusOfThisUser(array, IdOfSelectedClan, chosenTaskStatus)
      {
      $('#myModal').modal('hide');
      var chosenTabButton = $("#hiddenField").val();
      $.each(array, function(index,element){
      if(element.ClanId == IdOfSelectedClan)
      {
      element.TaskStatus = chosenTaskStatus;
      }
      else{
      $.each(element.Family, function(index,elementChild){
      if(elementChild.ClanId == IdOfSelectedClan)
      {
      elementChild.TaskStatus = chosenTaskStatus;
      }
      });
      }     //end of else
      });   //end of first $.each
      DisplayResult(array, chosenTabButton);
      }






      function CheckIfElementExistInArray(array, elementId)
      {
      var exist=false;
      $.each(array, function(index, element){
      if(element.IdOfSelectedClan == elementId)
      {
      exist = true;
      }
      });
      return exist;
      }






      function GetVotingPlaceIfClanExist(jusername)
      {
      var idVotingPlace;
      $.ajax({
      async: false,
      type: "GET",
      url: "http://localhost:35512/api/values/GetVotingPlaceIfClanExist",
      dataType:"json",
      data:{username:jusername},
      contentType: "application/json; charset=utf-8",
      success: function (data, textStatus, XmlHttpRequest) {
      idVotingPlace = data.VotingPlaceId;
      },
      error: function(xhr, textStatus, errorThrown) {
      idVotingPlace =0;
      }
      });
      return idVotingPlace;
      }




      }) // end of $(document).ready function

      }