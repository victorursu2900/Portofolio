#include <GL/glut.h>
#include <iostream>

void drawCube(float size) {
    glutSolidCube(size);
}

void drawLimb(float size) {
    glPushMatrix();
        glScalef(1, 4, 1);
        drawCube(size);
    glPopMatrix();
}

void drawRobot(float size) {
    // body (parallelogram)
    glColor3f(0.0, 0.0, 0.0);
    glPushMatrix();
        glScalef(1.5, 1.0, 0.5); // Scale the cube to form a parallelogram
        drawCube(size);
    glPopMatrix();

    // head (purple)
    glColor3f(1.0, 0.0, 0.0); // Adjusted to purple
    glPushMatrix();
        glTranslatef(0.0, size * 0.7, 0.0); // Position the head lower
        glutSolidSphere(size * 0.4, 20, 20); // Larger sphere
    glPopMatrix();

    // eyes (white)
    glColor3f(1.0, 1.0, 1.0); // Set color to white
    glPushMatrix();
        glTranslatef(-size * 0.2, size * 0.8, size * 0.4); // left eye
        drawCube(size * 0.1);
        glTranslatef(size * 0.4, 0, 0); // right eye
        drawCube(size * 0.1);
    glPopMatrix();

    // limbs (purple)
    glColor3f(0.5, 0.0, 0.5); // Adjusted to purple
    glPushMatrix();
        glTranslatef(-size * 0.3, -size * 1, 0); // left leg
        drawLimb(size * 0.3);
        glTranslatef(size * 0.6, 0, 0); // right leg
        drawLimb(size * 0.3);
        glTranslatef(-size * 1, size * 0.9, size * 0.15); // left arm
        drawLimb(size * 0.3);
        glTranslatef(size * 1.5, 0, 0); // right arm
        drawLimb(size * 0.3);
    glPopMatrix();
}

void display() {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glLoadIdentity();
    gluLookAt(3.0, 2.0, 7.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    GLfloat light_position[] = { 2.0, 5.0, 5.0, 1.0 };
    glLightfv(GL_LIGHT0, GL_POSITION, light_position);
    drawRobot(1);
    glutSwapBuffers();
}

void init() {
    glClearColor(250.0, 250.0, 250.0, 1.0);
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_LIGHTING);
    glEnable(GL_LIGHT0);
    glEnable(GL_COLOR_MATERIAL);

    GLfloat ambient[] = { 0.2, 0.2, 0.2, 1.0 };
    GLfloat diffuse[] = { 1.0, 1.0, 1.0, 1.0 };
    GLfloat specular[] = { 0.0, 0.0, 0.0, 1.0 };
    GLfloat shininess[] = { 50.0 };
    glMaterialfv(GL_FRONT, GL_AMBIENT, ambient);
    glMaterialfv(GL_FRONT, GL_DIFFUSE, diffuse);
    glMaterialfv(GL_FRONT, GL_SPECULAR, specular);
    glMaterialfv(GL_FRONT, GL_SHININESS, shininess);

    GLfloat light_ambient[] = { 0.0, 0.0, 0.0, 1.0 };
    GLfloat light_diffuse[] = { 1.0, 1.0, 1.0, 1.0 };
    GLfloat light_specular[] = { 1.0, 1.0, 1.0, 1.0 };
    glLightfv(GL_LIGHT0, GL_AMBIENT, light_ambient);
    glLightfv(GL_LIGHT0, GL_DIFFUSE, light_diffuse);
    glLightfv(GL_LIGHT0, GL_SPECULAR, light_specular);
}

void reshape(int w, int h) {
    glViewport(0, 0, w, h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(40.0, (double)w / (double)h, 1.0, 90.0);
    glMatrixMode(GL_MODELVIEW);
}

void idle() {
    glutPostRedisplay();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
    glutInitWindowSize(800, 600);
    glutCreateWindow("Robot");
    init();
    glutDisplayFunc(display);
    glutReshapeFunc(reshape);
    glutIdleFunc(idle);
    glutMainLoop();
    return 0;
}

