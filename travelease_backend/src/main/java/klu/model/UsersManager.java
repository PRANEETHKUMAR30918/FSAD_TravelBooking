package klu.model;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Service;

import klu.repository.UsersRepository;

@Service
public class UsersManager {

	@Autowired
	
	JWTManager JWT;
	@Autowired
	UsersRepository UR;
	public String addUser(Users u) {
		if(UR.validateEmail(u.getEmail())>0)
		      return "401::Email already Exist";
		UR.save(u);
		return "200::Registred Successfull";
	}
	
	public String validateCredentials(String email,String password)
	{
		if(UR.validateCredentials(email,password)>0) {
			String token=JWT.generateToken(email);
			return "200::"+token;
		}
		return "401::Invalid Credentials";
	}
	
	public String getFullname(String token) {
	    String email = JWT.validateToken(token);
	    if(email.compareTo("401") == 0)
	      return "401::Token Expired!";
	    Users U = UR.findById(email).get();
	    return U.getFullname();
	}
	
}