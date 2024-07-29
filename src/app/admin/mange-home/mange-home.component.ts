import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-mange-home',
  templateUrl: './mange-home.component.html',
  styleUrls: ['./mange-home.component.css']
})
export class MangeHomeComponent implements OnInit {
  homeContent: any = {}; // Initialize as an empty object
  updateForm: FormGroup;
  currentContent: any;
  @ViewChild('updateDialog') updateDialog!: TemplateRef<any>;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private adminService: AdminService) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchHomePageContents();
  }

  fetchHomePageContents() {
    this.adminService.getHomeContent().subscribe(data => {
      if (data && data.length > 0) {
        this.homeContent = data[0]; // Assuming the API returns an array with one item
      }
    });
  }

  openUpdateDialog(content: any): void {
    this.currentContent = content;
    this.updateForm.setValue({
      title: content.title || '',
      content: content.content || '',
      image: content.image || ''
    });
    this.dialog.open(this.updateDialog, {
      width: '400px'
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedContent = {
        ...this.currentContent,
        ...this.updateForm.value
      };
      this.adminService.updateHomeContent(updatedContent).subscribe(() => {
        this.fetchHomePageContents(); // Refresh the content list after updating
        this.dialog.closeAll();
      });
    }
  }
}
