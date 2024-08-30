import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Injectable()
export class SeederService {
  constructor(private adminService: AdminService) {}

  async seedAdmins() {
    const adminData = [
      {
        password: ENVIRONMENT.ADMIN.PASSWORD,
        email: ENVIRONMENT.ADMIN.EMAIL,
      },
    ];

    return await Promise.all(
      adminData.map((item) => this.adminService.create()),
    );
  }
}
