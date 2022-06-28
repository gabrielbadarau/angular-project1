import { HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { tap } from 'rxjs';
import { HttpWrapperService } from './http-wrapper.service';

describe('HttpWrapperService testing', () => {
    let spectator: SpectatorHttp<HttpWrapperService>;
    const createHttp = createHttpFactory(HttpWrapperService);
    const mockUrl = 'api/mockCall'
    let mockBody = {
        "first_name": "Vladimir",
        "last_name": "Ionescu",
        "id": 1013,
        "email": "Vladimir_Ionescu@gmail.com",
        "password": "gjkdlp908",
        "profile_picture": "../../../assets/b13.jpg",
        "role": "Tester",
        "permissions": "Chunin"
    }

    beforeEach(() => spectator = createHttp());

    it('get method', () => {
        spectator.service.get(mockUrl).subscribe();
        spectator.expectOne(mockUrl, HttpMethod.GET);
    });

    it('put method', () => {
        spectator.service.put(mockUrl, mockBody).subscribe();
        spectator.expectOne(mockUrl, HttpMethod.PUT)
    })

    it('post method', () => {
        spectator.service.post(mockUrl, mockBody).subscribe();
        spectator.expectOne(mockUrl, HttpMethod.POST)
    })

    it('delete method', () => {
        spectator.service.delete(mockUrl).subscribe();
        spectator.expectOne(mockUrl, HttpMethod.DELETE)
    })

    it("handle Error", () => {
        let errorResponse

        spectator.service.get(mockUrl).subscribe({ error: (err) => errorResponse = err })
        spectator.controller.expectOne(mockUrl, HttpMethod.GET).flush("", { status: 404, statusText: "Not Found" });
        expect(typeof errorResponse === 'string').toBe(true);

        spectator.service.get(mockUrl).subscribe({ error: (err) => errorResponse = err })
        spectator.controller.expectOne(mockUrl, HttpMethod.GET).flush(new ErrorEvent('', { message: 'big error' }), { status: 404, statusText: "Not Found" });
        expect(typeof errorResponse === 'string').toBe(true);
    })

});