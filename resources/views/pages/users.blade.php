<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="csrf-token" content="{{ csrf_token() }}">
<title>User Details</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
<script src="https://cdn.datatables.net/2.0.8/css/dataTables.dataTables.min.css"></script>
<script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>
<!-- <script src="jquery-3.7.1.min.js"></script> -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.20.0/jquery.validate.min.js" integrity="sha512-WMEKGZ7L5LWgaPeJtw9MBM4i5w5OSBlSjTjCtSnvFJGSVD26gE5+Td12qN5pvWXhuWaWcVwF++F7aqu9cvqP0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<style>
body {
	color: #566787;
	background: #f5f5f5;
	font-family: 'Varela Round', sans-serif;
	font-size: 13px;
}
.table-responsive {
    margin: 30px 0;
}
.table-wrapper {
	background: #fff;
	padding: 20px 25px;
	border-radius: 3px;
	min-width: 1000px;
	box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {        
	padding-bottom: 15px;
	background: #435d7d;
	color: #fff;
	padding: 16px 30px;
	min-width: 100%;
	margin: -20px -25px 10px;
	border-radius: 3px 3px 0 0;
}
.table-title h2 {
	margin: 5px 0 0;
	font-size: 24px;
}
.table-title .btn-group {
	float: right;
}
.table-title .btn {
	color: #fff;
	float: right;
	font-size: 13px;
	border: none;
	min-width: 50px;
	border-radius: 2px;
	border: none;
	outline: none !important;
	margin-left: 10px;
}
.table-title .btn i {
	float: left;
	font-size: 21px;
	margin-right: 5px;
}
.table-title .btn span {
	float: left;
	margin-top: 2px;
}
table.table tr th, table.table tr td {
	border-color: #e9e9e9;
	padding: 12px 15px;
	vertical-align: middle;
}
table.table tr th:first-child {
	width: 60px;
}
table.table tr th:last-child {
	width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
	background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
	background: #f5f5f5;
}
table.table th i {
	font-size: 13px;
	margin: 0 5px;
	cursor: pointer;
}	
table.table td:last-child i {
	opacity: 0.9;
	font-size: 22px;
	margin: 0 5px;
}
table.table td a {
	font-weight: bold;
	color: #566787;
	display: inline-block;
	text-decoration: none;
	outline: none !important;
}
table.table td a:hover {
	color: #2196F3;
}
table.table td a.edit {
	color: #FFC107;
}
table.table td a.delete {
	color: #F44336;
}
table.table td i {
	font-size: 19px;
}
table.table .avatar {
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 10px;
}
.pagination {
	float: right;
	margin: 0 0 5px;
}
.pagination li a {
	border: none;
	font-size: 13px;
	min-width: 30px;
	min-height: 30px;
	color: #999;
	margin: 0 2px;
	line-height: 30px;
	border-radius: 2px !important;
	text-align: center;
	padding: 0 6px;
}
.pagination li a:hover {
	color: #666;
}	
.pagination li.active a, .pagination li.active a.page-link {
	background: #03A9F4;
}
.pagination li.active a:hover {        
	background: #0397d6;
}
.pagination li.disabled i {
	color: #ccc;
}
.pagination li i {
	font-size: 16px;
	padding-top: 6px
}
.hint-text {
	float: left;
	margin-top: 10px;
	font-size: 13px;
}    
/* Custom checkbox */
.custom-checkbox {
	position: relative;
}
.custom-checkbox input[type="checkbox"] {    
	opacity: 0;
	position: absolute;
	margin: 5px 0 0 3px;
	z-index: 9;
}
.custom-checkbox label:before{
	width: 18px;
	height: 18px;
}
.custom-checkbox label:before {
	content: '';
	margin-right: 10px;
	display: inline-block;
	vertical-align: text-top;
	background: white;
	border: 1px solid #bbb;
	border-radius: 2px;
	box-sizing: border-box;
	z-index: 2;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
	content: '';
	position: absolute;
	left: 6px;
	top: 3px;
	width: 6px;
	height: 11px;
	border: solid #000;
	border-width: 0 3px 3px 0;
	transform: inherit;
	z-index: 3;
	transform: rotateZ(45deg);
}
.custom-checkbox input[type="checkbox"]:checked + label:before {
	border-color: #03A9F4;
	background: #03A9F4;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
	border-color: #fff;
}
.custom-checkbox input[type="checkbox"]:disabled + label:before {
	color: #b8b8b8;
	cursor: auto;
	box-shadow: none;
	background: #ddd;
}
/* Modal styles */
.modal .modal-dialog {
	max-width: 400px;
}
.modal .modal-header, .modal .modal-body, .modal .modal-footer {
	padding: 20px 30px;
}
.modal .modal-content {
	border-radius: 3px;
	font-size: 14px;
}
.modal .modal-footer {
	background: #ecf0f1;
	border-radius: 0 0 3px 3px;
}
.modal .modal-title {
	display: inline-block;
}
.modal .form-control {
	border-radius: 2px;
	box-shadow: none;
	border-color: #dddddd;
}
.modal textarea.form-control {
	resize: vertical;
}
.modal .btn {
	border-radius: 2px;
	min-width: 100px;
}	
.modal form label {
	font-weight: normal;
}	
.error {
            color: red;
        }
</style>
<script>
$(document).ready(function(){
    let table = new DataTable('#user_table');
});
</script>
</head>
<body>
<div class="container-xl">
	<div class="table-responsive">
		<div class="table-wrapper">
			<div class="table-title">
				<div class="row">
					<div class="col-sm-6">
						<h2>Manage <b>User</b></h2>
					</div>
					<div class="col-sm-6">
						<a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
						<!-- <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Delete</span></a>						 -->
					</div>
				</div>
			</div>
			<table class="table table-striped table-hover" id="user_table">
				<thead>
					<tr>
						
						<th>Name</th>
						<th>Email</th>
						<th>Mobile No.</th>
						<th>Gender</th>
						<th>Date Of Birth</th>
						<th>Age</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					@foreach ($data as $value)
						<tr>
							<td>{{$value->name}}</td>
							<td>{{$value->email}}</td>
							<td>{{$value->mobile_no}}</td>
							<td>{{$value->gender}}</td>
							<td>{{$value->date_of_birth}}</td>
							<td>{{$value->age}}</td>
							<td>
								<a href="#editEmployeeModal" class="edit"
									data-user_id="{{$value->id}}"
									data-name="{{$value->name}}"
									data-email="{{$value->email}}" 
									data-mobile_no="{{$value->mobile_no}}" 
									data-gender="{{$value->gender}}" 
									data-date_of_birth="{{$value->date_of_birth}}" 
									data-age="{{$value->age}}" 
									@if(isset($value->user_address)) 
										@foreach ($value->user_address as $index => $address)
											data-address_id-{{$index}} = "{{$address->id}}"
											data-address-{{$index}}="{{$address->address}}" 
											data-city-{{$index}}="{{$address->city}}" 
											data-state-{{$index}}="{{$address->state}}" 
											data-pincode-{{$index}}="{{$address->pincode}}"
										@endforeach
									@endif  
									data-toggle="modal">
									<i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#deleteEmployeeModal" class="delete" data-delete_id="{{$value->id}}" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>        
</div>
<!-- Add Modal HTML -->
<div id="addEmployeeModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="user_add_form">
                @csrf
				<div class="modal-header">						
					<h4 class="modal-title">Add Employee</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<div class="form-group">
						<label>Name</label>
						<input type="text" name="name" class="form-control"  >
					</div>
					<div class="form-group">
						<label>Email</label>
						<input type="email" name="email" class="form-control"  >
					</div>
					<div class="form-group">
						<label>Mobile No.</label>
						<input type="number" class="form-control" name="mobile_no" maxlength="10" pattern="\d{10}">
					</div>	
                    <div class="form-group">
                        <label>Gender</label><br>
                        <input type="radio" id="male" name="gender" value="male"  >
                        <label for="male">Male</label><br>
                        <input type="radio" id="female" name="gender" value="female">
                        <label for="female">Female</label>
                    </div>	
                    <div class="form-group">
						<label>Date Of Birth</label>
						<input type="date" id="dob" name="dob" class="form-control dob"  >
					</div>	
                    <div class="form-group">
                        <label for="age">Age</label>
						<input type="text" id="age" name="age" class="form-control age" readonly>
                    </div>			
					<div id="add-address-container"></div>
                    <button type="button" id="add-address" class="btn btn-primary">Add Address</button>
				</div>
                
				<div class="modal-footer">
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
					<input type="submit" class="btn btn-success" value="Add">
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Edit Modal HTML -->
<div id="editEmployeeModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="edit_user_form">
				@csrf
				<div class="modal-header">						
					<h4 class="modal-title">Edit Employee</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
				<div class="form-group">
						<label>Name</label>
						<input type="hidden" id="user_id" name="user_id" >
						<input type="text" name="name" class="form-control"  >
					</div>
					<div class="form-group">
						<label>Email</label>
						<input type="email" name="email" class="form-control"  >
					</div>
					<div class="form-group">
						<label>Mobile No.</label>
						<input type="number" class="form-control" name="mobile_no" maxlength="10" pattern="\d{10}">
					</div>	
                    <div class="form-group">
                        <label>Gender</label><br>
                        <input type="radio" id="male" name="gender" value="male"  >
                        <label for="male">Male</label><br>
                        <input type="radio" id="female" name="gender" value="female">
                        <label for="female">Female</label>
                    </div>	
                    <div class="form-group">
						<label>Date Of Birth</label>
						<input type="date" id="dob" name="dob" class="form-control dob"  >
					</div>	
                    <div class="form-group">
                        <label for="age">Age</label>
						<input type="text" id="age" name="age" class="form-control age" readonly>
                    </div>			
					<div id="" class="edit-address-container"></div>
                    <button type="button" id="edit-address" class="btn btn-primary">Add Address</button>
				</div>
				
				<div class="modal-footer">
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
					<input type="submit" class="btn btn-info" value="Save">
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Delete Modal HTML -->
<div id="deleteEmployeeModal" class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form>
				<div class="modal-header">						
					<h4 class="modal-title">Delete Employee</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">					
					<p>Are you sure you want to delete these Records?</p>
					<p class="text-warning"><small>This action cannot be undone.</small></p>
				</div>
				<div class="modal-footer">
					<input type="hidden" name="delete_user_id" id="delete_user_id">
					<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
					<input type="submit" class="btn btn-danger" id="user_delete_btn" value="Delete">
				</div>
                
			</form>
		</div>
	</div>
</div>
</body>
<script>
    // Populate age select box
    $(document).ready(function() {


		// Function to calculate age from date of birth
		function calculateAge(dateOfBirth) {
			var dob = new Date(dateOfBirth);
			var today = new Date();
			var age = today.getFullYear() - dob.getFullYear();
			var m = today.getMonth() - dob.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
				age--;
			}
			return age;
		}

		// Update age when date of birth changes
			$('.dob').change(function() {
				var dob = $(this).val();
				var age = calculateAge(dob);
				$('.age').val(age);
			});

		//add form add address field

		let addressCount = 0;

        $('#add-address').click(function() {
            addressCount++;
            const addressFields = `
                <div class="address-block" id="address-block-${addressCount}">
                    <div class="form-group">
                        <label for="addresses[${addressCount}][address]">Address</label>
                        <input type="text" name="addresses[${addressCount}][address]" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="addresses[${addressCount}][state]">State</label>
                        <input type="text" name="addresses[${addressCount}][state]" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="addresses[${addressCount}][city]">City</label>
                        <input type="text" name="addresses[${addressCount}][city]" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="addresses[${addressCount}][pincode]">Pincode</label>
                        <input type="number" name="addresses[${addressCount}][pincode]" class="form-control" required>
                    </div>
                    <button type="button" class="btn btn-danger remove-address" data-id="${addressCount}">Remove</button>
                    <hr>
                </div>
            `;
            $('#add-address-container').append(addressFields);
        });

        $(document).on('click', '.remove-address', function() {
            const id = $(this).data('id');
            $(`#address-block-${id}`).remove();
        });

		// Function to add address fields
		function addAddressField(index,address_id = '' , address = '', state = '', city = '', pincode = '') {
			const addressFields = `
				<div class="edit-address-block" id="address-block-${index}">
					<div class="form-group">
						<label for="address-${index}">Address</label>
						<input type="text" name="addresses[${index}][address]" id="address-${index}" class="form-control" value="${address}" >
					</div>
					<div class="form-group">
						<label for="state-${index}">State</label>
						<input type="text" name="addresses[${index}][state]" id="state-${index}" class="form-control" value="${state}" >
					</div>
					<div class="form-group">
						<label for="city-${index}">City</label>
						<input type="text" name="addresses[${index}][city]" id="city-${index}" class="form-control" value="${city}" >
					</div>
					<div class="form-group">
						<label for="pincode-${index}">Pincode</label>
						<input type="number" name="addresses[${index}][pincode]" id="pincode-${index}" class="form-control" value="${pincode}" >
					</div>
					<input type="hidden" name="addresses[${index}][address_id]" id="address_id-${index}" value="${address_id}">
					<button type="button" class="btn btn-danger edit-remove-address" data-id="${index}">Remove</button>
					<hr>
				</div>
			`;
			$('.edit-address-container').append(addressFields);
		}


        
        
        $('#edit-address').click(function() {
            addressCount++;
            const addressFields = `
                <div class="address-block" id="address-block-${addressCount}">
                    <div class="form-group">
                        <label for="address-${addressCount}">Address</label>
                        <input type="text" name="addresses[${addressCount}][address]" id="address-${addressCount}" class="form-control"  >
                    </div>
                    <div class="form-group">
                        <label for="state-${addressCount}">State</label>
                        <input type="text" name="addresses[${addressCount}][state]" id="state-${addressCount}" class="form-control"  >
                    </div>
                    <div class="form-group">
                        <label for="city-${addressCount}">City</label>
                        <input type="text" name="addresses[${addressCount}][city]" id="city-${addressCount}" class="form-control"  >
                    </div>
                    <div class="form-group">
                        <label for="pincode-${addressCount}">Pincode</label>
                        <input type="text" name="addresses[${addressCount}][pincode]" id="pincode-${addressCount}" class="form-control"  >
                    </div>
                    <button type="button" class="btn btn-danger edit-remove-address" data-id="${addressCount}">Remove</button>
                    <hr>
                </div>
            `;
            $('.edit-address-container').append(addressFields);
        });

        // Remove address fields on button click
        $(document).on('click', '.remove-address', function() {
            const id = $(this).data('id');
            $(`#address-block-${id}`).remove();
        });
    
        // Prevent non-numeric characters in the mobile number field
		$('input[name="mobile_no"]').on('input', function(event) {
			this.value = this.value.replace(/\D/g, '');
		});

		$("#user_add_form").validate({
			rules: {
				name: "required",
				email: {
					required: true,
					email: true
				},
				mobile_no: {
					required: true,
					digits: true,
					maxlength: 10
				},
				gender: "required",
				dob: "required",
				age: {
					required: true,
					number: true,
					min: 20,
					max: 100
				},
				'addresses[][address]': "required",
				'addresses[][state]': "required",
				'addresses[][city]': "required",
				'addresses[][pincode]': "required"
			},
			messages: {
				name: "Please Enter Name",
				email: {
					required: "Please Enter Email",
					email: "Please enter a valid Email"
				},
				mobile_no: {
					required: "Please Enter Mobile No",
					digits: "Please enter only numbers",
					maxlength: "Mobile number must be no more than 10 digits"
				},
				gender: "Please select your gender",
				dob: "Please enter your date of birth",
				age: {
					required: "Please enter your age",
					number: "Age must be a number",
					min: "Age must be at least 20",
					max: "Age must be at most 100"
				},
				'addresses[][address]': "Please enter an address",
				'addresses[][state]': "Please enter a state",
				'addresses[][city]': "Please enter a city",
				'addresses[][pincode]': "Please enter a pincode"
			},
			submitHandler: function(form) {
				var formData = new FormData(form);
				$.ajax({
					url: "{{ route('addUserData') }}",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						// alert(result.message);
						if (result.success) {
							form.reset();
							$('#address-container').empty();
							window.location.reload();
						}
					},
					error: function(xhr) {
						alert('An error occurred. Please try again.');
					}
				});
			}
		});

		$(document).on("click", ".edit", function () {
			
			// Clear previous address fields
			$('.edit-address-container').empty();


			var user_id = $(this).data('user_id');
			var name = $(this).data('name');
			var email = $(this).data('email');
			var mobile_no = $(this).data('mobile_no');
			var gender = $(this).data('gender');
			var date_of_birth = $(this).data('date_of_birth');
			var age = calculateAge(date_of_birth);

			// Initialize an empty array to hold addresses with their details
			var addresses = [];

			// Loop to find all address-related data attributes
			for (var i = 0; $(this).data('address-' + i) !== undefined; i++) {
				var address = $(this).data('address-' + i);
				var state = $(this).data('state-' + i);
				var city = $(this).data('city-' + i);
				var pincode = $(this).data('pincode-' + i);
				var address_id = $(this).data('address_id-' + i);
				// alert(address_id);
				addresses.push({
					address: address,
					state: state,
					city: city,
					pincode: pincode,
					address_id: address_id
				});
			}
			// Populate the modal fields
			$('#edit_user_form [name="user_id"]').val(user_id);
			$('#edit_user_form [name="name"]').val(name);
			$('#edit_user_form [name="email"]').val(email);
			$('#edit_user_form [name="mobile_no"]').val(mobile_no);
			$(`#edit_user_form [name="gender"][value="${gender}"]`).prop('checked', true);
			$('#edit_user_form [name="dob"]').val(date_of_birth);
			$('#edit_user_form [name="age"]').val(age);

			// Clear previous address fields
			$('#address-container').empty();

			// Populate address fields if addresses exist
			if (addresses.length > 0) {
				addresses.forEach(function(addr, index) {
					addAddressField(index, addr.address_id, addr.address, addr.state, addr.city, addr.pincode);
				});
			}

					
			// $('#delete_manage_activity_id').val(delete_id);
			// $('#editEmployeeModal').modal('show');
		});

		// Add new address field on button click
		$('#edit-address').click(function() {
			const index = $('.edit-address-block').length; // Get the current number of address blocks
			addAddressField(index);
		});

		// Remove address fields on button click add form
		$(document).on('click', '.add-remove-address', function() {
			const id = $(this).data('id');
			$(`#address-block-${id}`).remove();
		});

		// Remove address fields on button click edit form
		$(document).on('click', '.edit-remove-address', function() {
			const id = $(this).data('id');
			$(`#address-block-${id}`).remove();
		});


		$("#edit_user_form").validate({
			submitHandler: function(form) {

				var formData = new FormData(form);
				$.ajax({
					url: "{{ route('editUserData') }}",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function(result) {
						// alert(result.message);
						if (result.success) {
							form.reset();
							$('#address-container').empty();
							window.location.reload();
						}
					},
					error: function(xhr) {
						alert('An error occurred. Please try again.');
					}
				});
			}
		});

		$(document).on("click", ".delete", function () {

			var delete_user_id = $(this).data('delete_id');

			// alert(delete_user_id);

			$('#delete_user_id').val(delete_user_id);

		});

		$(document).on("click", "#user_delete_btn", function (e) {
			e.preventDefault();
			var deleteUserId = $('#delete_user_id').val();

			$.ajax({
				url: "{{ route('deleteUser') }}",
				type: "POST",
				data: {
					user_id: deleteUserId
				},
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				success: function(result) {
					if (result.success) {
						// Handle success, maybe show a success message
						// $('#deleteEmployeeModal').modal('hide');
						// Optionally, you can reload the page or update the user interface
						window.location.reload();
					} else {
						// Handle error
						alert(result.message);
					}
				},
				error: function(xhr) {
					alert('An error occurred. Please try again.');
				}
			});
		});
	});
</script>
</html>