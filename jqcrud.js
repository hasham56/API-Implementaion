$(function() {
  loadRecipies();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function() {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var body = $("#updateBody").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
      data: { title, body },
      method: "PUT",
      success: function(response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function(
    response
  ) {
    $("#updateId").val(response._id);
    $("#updateTitle").val(response.title);
    $("#updateBody").val(response.body);
    $("#updateModal").modal("show");
  });
}
function addRecipe() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title, body },
    success: function(response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function() {
      loadRecipies();
    }
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    error: function(response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i+=2) {
        recipes.append(
          `<div class="row">
           <div class="col-md-6 card d-inline-block shadow-lg" data-id="${response[i]._id}">
              <h3 class="heading">${response[i].title}</h3>
                <div class="row">
                  <div class="col-md-9">
                    <p class="p-3">
                      &emsp;${response[i].body}
                    </p>
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-info btn-sm my-4 px-4 py-2">Edit</button>
                    <button class="btn btn-danger btn-sm px-3 py-2">Delete</button>
                  </div>
                </div>
            </div>
            <div class="col-md-6 card d-inline-block shadow-lg" data-id="${response[i+1]._id}">
              <h3 class="heading">${response[i+1].title}</h3>
                <div class="row">
                  <div class="col-md-9">
                    <p class="p-3">
                      &emsp;${response[i+1].body}
                    </p>
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-info btn-sm my-4 px-4 py-2">Edit</button>
                    <button class="btn btn-danger btn-sm px-3 py-2">Delete</button>
                  </div>
                </div>
            </div>
          </div>`
        );
      }
    }
  });
}
