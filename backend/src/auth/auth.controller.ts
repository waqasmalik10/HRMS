import {
  Body,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SigninDto } from './dto/signin.dto';
import { Public } from '../commons/decorators/isPublic';
import { PasswordChangeDto } from './dto/password-change.dto';
import { CompanySignupDto } from './dto/admin-signup.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @ApiOperation({ summary: 'Create a new company admin profile.' })
  @ApiAcceptedResponse({
    description: 'Company admin has been registered successfully.',
  })
  signup(@Body() companySignupDto: CompanySignupDto) {
    return this.authService.signup(companySignupDto);
  }

  @Post('signin')
  @Public()
  @ApiOperation({ summary: 'Signin endpoint for admin' })
  @ApiAcceptedResponse({ description: 'Signin successful.' })
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: "Get Loggedin user's profile" })
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @Post('change-password')
  @ApiOperation({ summary: 'change admin password.' })
  changePassword(@Body() passwordChangeDto: PasswordChangeDto, @Request() req) {
    return this.authService.changePassword(passwordChangeDto, req.user.email);
  }
}
