package com.faithinquest.web.controller;

import com.faithinquest.model.Admin;
import com.faithinquest.security.AccountHolder;
import com.faithinquest.service.IAdminService;
import com.faithinquest.web.util.DefaultMessages;
import com.faithinquest.web.util.OkResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * User: gleb
 * Date: 12/5/13
 * Time: 12:25 PM
 */
@Controller
@RequestMapping( Routes.ADMIN_ACCOUNT )
public class AdminAccountController
{
	@Autowired
	private IAdminService adminService;

	private String getSessionKey()
	{
		return AccountHolder.ADMIN_KEY;
	}

	@RequestMapping( value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public Admin login( @RequestParam( value = "login", required = true ) String login,
	                    @RequestParam( value = "password", required = true ) String password,
	                    HttpSession session, HttpServletRequest request )
	{
		Admin admin = adminService.findAccountAndLogin( login, password );
		session.setAttribute( getSessionKey(), admin );
		return admin;
	}

	@RequestMapping( value = "/info", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public Admin getLoggedInfo( HttpSession session )
	{
		return (Admin) session.getAttribute( getSessionKey() );
	}

	@RequestMapping( value = "/logout", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public OkResponse logout( HttpSession session )
	{
		session.removeAttribute( getSessionKey() );
		return DefaultMessages.OK_RESPONSE;
	}

	@RequestMapping( value = "/change-password", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE )
	@ResponseBody
	public Admin changePassword( @RequestParam( value = "login", required = true ) String login,
	                             @RequestParam( value = "password", required = true ) String password,
	                             @RequestParam( value = "newPassword", required = true ) String newPassword,
	                             HttpSession session, HttpServletRequest request )
	{
		adminService.changePassword( login, password, newPassword );
		Admin admin = adminService.findAccountAndLogin( login, newPassword );
		session.setAttribute( getSessionKey(), admin );
		return admin;
	}
}
