import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-mange-aboutus',
  templateUrl: './mange-aboutus.component.html',
  styleUrls: ['./mange-aboutus.component.css']
})
export class MangeAboutusComponent  implements OnInit {
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
    this.fetchAboutUsPageContents();
  }

  fetchAboutUsPageContents() {
    this.adminService.getAboutusPage().subscribe(data => {
      if (data && data.length > 0) {
        this.homeContent = data[0]; // Assuming the API returns an array with one item
      }
    });
  }
  getImageUrl(imageName: string): string {
    const basePath = 'src/assets/image/'; // Adjust this path if needed
    return imageName ? `${basePath}${imageName}` : 'assets/image/placeholder.png'; // Provide a default or placeholder image if necessary
  }
  openUpdateDialog(content: any): void {
    this.currentContent = content;
    this.updateForm.setValue({
      title: content.title || '',
      content: content.content || '',
      image: content.image || ''
    });
    this.dialog.open(this.updateDialog, {
       width: '600px', // Increase the width
      panelClass: 'custom-dialog-container'
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedContent = {
        ...this.currentContent,
        ...this.updateForm.value
      };
      this.adminService.updateAboutUsContent(updatedContent).subscribe(() => {
        this.fetchAboutUsPageContents(); // Refresh the content list after updating
        this.dialog.closeAll();
      });
    }
  }
}
