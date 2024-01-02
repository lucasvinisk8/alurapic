import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/core/user/user.service";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { Photo } from "../photo/photo";
import { PhotoComment } from "../photo/photo-comment";
import { PhotoService } from "../photo/photo.service";


@Component({
    templateUrl: './photo-details.component.html'
})

export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private aletService: AlertService,
        private userSerrvice: UserService
    ) {

    }

    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findByid(this.photoId);
        this.photo$.subscribe(() => { }, err => {
            console.log(err);
            this.router.navigate(['not-found']);
        })
    }

    remove() {
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(() => {
                this.aletService.success('Photo removed', true);
                this.router.navigate(['/user', this.userSerrvice.getUserName()], { replaceUrl: true });
            },
                err => {
                    console.log(err);
                    this.aletService.warning('Could not delete the photo!', true);
                }
            );
    }

    like(photo: Photo) {
        this.photoService
            .like(photo.id)
            .subscribe(liked => {
                if (liked) {
                    this.photo$ = this.photoService.findByid(photo.id);
                }
            });
    }
}