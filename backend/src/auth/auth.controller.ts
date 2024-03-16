import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiAcceptedResponse, ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSignupDto } from './dto/admin-signup.dto';
import { AdminSigninDto } from './dto/admin-signin.dto';
import { Public } from '../commons/decorators/isPublic';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('signup')
    @Public()
    @ApiOperation({summary: 'Create a new company admin profile.'})
    @ApiAcceptedResponse({description: 'Company admin has been registered successfully.'})
    signup(@Body() adminSignupDto: AdminSignupDto) {
        return this.authService.signup(adminSignupDto)
    }

    @Post('signin')
    @Public()
    @ApiOperation({summary: 'Signin endpoint for admin'})
    @ApiAcceptedResponse({description: 'Signin successful.'})
    signin(@Body() adminSigninDto: AdminSigninDto) {
        return this.authService.signin(adminSigninDto);
    }

    @ApiBearerAuth()
    @Get('profile')
    @ApiOperation({summary: 'Get Loggedin user\'s profile'})
    getProfile(@Request() req) {
        return req.user;
    }
    
}
