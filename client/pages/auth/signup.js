export default () => {
	return (
		<form>
			<h1>Sign Up</h1>
			<div className='form-group'>
				<label>Email address</label>
				<input className='form-control' />
			</div>
			<div className='form-group'>
				<label>Email address</label>
				<input type='password' className='form-control' />
			</div>
			<button className='btn btn-primary'>Sign Up</button>
		</form>
	);
};
