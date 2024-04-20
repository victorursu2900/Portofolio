#include <GL/glut.h>
#include <GL/glu.h>

// Control points for the NURBS surface
GLfloat ctrlpoints[4][4][3] = {
    {{-1.5, -1.5, 2.0}, {-0.5, -1.5, 1.5}, {0.5, -1.5, -1.0}, {1.5, -1.5, 1.5}},
    {{-1.5, -0.5, 1.0}, {-0.5, -0.5, 3.0}, {0.5, -0.5, 0.0}, {1.5, -0.5, -1.0}},
    {{-1.5, 0.5, 4.0}, {-0.5, 0.5, 0.0}, {0.5, 0.5, 3.0}, {1.5, 0.5, 4.0}},
    {{-0.5, 1.5, -2.0}, {-0.5, 2.5, -2.0}, {0.5, 1.5, 1.0}, {1.5, 1.5, -1.0}}
};

// NURBS object
GLUnurbsObj *theNurb;

void initSurface() {
    theNurb = gluNewNurbsRenderer();
    gluNurbsProperty(theNurb, GLU_SAMPLING_TOLERANCE, 25.0);
    gluNurbsProperty(theNurb, GLU_DISPLAY_MODE, GLU_LINE);
}

void display(void) {
    GLfloat knots[8] = {0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0};

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glDisable(GL_LIGHTING);
    glColor3f(1.0, 0.0, 0.0);

    glPushMatrix();
    glRotatef(330.0, 1.0, 0.0, 0.0);
    glScalef(0.5, 0.5, 0.5);

    gluBeginSurface(theNurb);
    gluNurbsSurface(theNurb, 8, knots, 8, knots, 4 * 3, 3, &ctrlpoints[0][0][0], 4, 4, GL_MAP2_VERTEX_3);
    gluEndSurface(theNurb);

    glPopMatrix();
    glutSwapBuffers();
}

void reshape(int w, int h) {
    glViewport(0, 0, (GLsizei) w, (GLsizei) h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(45.0, (GLfloat) w/(GLfloat) h, 3.0, 8.0);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    glTranslatef(0.0, 0.0, -5.0);
}

int main(int argc, char **argv) {
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE | GLUT_DEPTH);
    glutInitWindowSize(500, 500);
    glutCreateWindow("NURBS");

    initSurface();

    glutDisplayFunc(display);
    glutReshapeFunc(reshape);

    glutMainLoop();
    return 0;
}
