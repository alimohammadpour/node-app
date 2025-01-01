import { User } from "../../models/userModel.js";
import { createUserModel, getUserProgress } from "../../services/userService.js";
import { createUser, getProgress } from "../../controllers/userController.js";

jest.mock("../../services/userService.js", () => {
    return {
        createUserModel: jest.fn(),
        getUserProgress: jest.fn().mockResolvedValue({})
    }
});

describe('User Controller', () => {
    const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    describe('create a user', () => {
        const reqMock = {
            body: {
                name: 'name',
                email: 'test@test.com',
                password: 'password',
            },
        };
    
        afterEach(() => expect(createUserModel).toHaveBeenCalledWith(reqMock.body));
        
        it('should be created successfully', async() => {
            createUserModel.mockResolvedValueOnce({ id: '' })
            await createUser(reqMock, resMock);

            expect(resMock.status).toHaveBeenCalledWith(201);
            expect(resMock.json).toHaveBeenCalledWith({ 
                message: 'User created successfully.', 
                id: '' 
            });
        });

        it('should be failed', async() => {
            createUserModel.mockRejectedValueOnce(new Error(''));
            await createUser(reqMock, resMock);

            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.json).toHaveBeenCalledWith({ 
                error: ''
            });
        });
    });

    it('get a user progress', async() => {
        const reqMock = {
            params: { id: '' }
        };
        await getProgress(reqMock, resMock);

        expect(getUserProgress).toHaveBeenCalledWith(reqMock.params.id);
        expect(resMock.status).toHaveBeenCalledWith(200);
        expect(resMock.json).toHaveBeenCalledWith({ progress: {} });
    })
});