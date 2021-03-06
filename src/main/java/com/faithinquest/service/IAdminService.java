package com.faithinquest.service;

import com.faithinquest.model.Admin;
import com.faithinquest.persistence.IPersistenceService;

/**
 * User: gleb
 * Date: 5/14/14
 * Time: 3:29 PM
 */
public interface IAdminService extends IPersistenceService<Admin, Long>
{
	Admin findAccountAndLogin( String login, String password );

	Admin findByLogin( final String login );

	void changePassword( String login, String password, String newPassword );
}
