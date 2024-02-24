import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSignupDto } from './dto/admin-signup.dto';
import { AdminSigninDto } from './dto/admin-signin.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('signup')
    @ApiOperation({summary: 'Create a new company admin profile.'})
    @ApiAcceptedResponse({description: 'Company admin has been registered successfully.'})
    signup(@Body() adminSignupDto: AdminSignupDto) {
        return this.authService.signup(adminSignupDto)
    }

    @Post('signin')
    @ApiOperation({summary: 'Signin endpoint for admin'})
    @ApiAcceptedResponse({description: 'Signin successful.'})
    signin(@Body() adminSigninDto: AdminSigninDto) {
        return this.authService.signin(adminSigninDto);
    }
    
}
