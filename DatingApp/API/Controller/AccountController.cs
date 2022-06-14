﻿using API.DTOs;
using DatingApp.API.Controller;
using DatingApp.API.Data;
using DatingApp.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controller
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            this._context = context;
        }


        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto regesterDto)
        {
            if(await UserExists(regesterDto.UserName))
            {
                return BadRequest("Usename is taken.");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = regesterDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(regesterDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(user => user.UserName == userName.ToLower());
        }
    }
}
